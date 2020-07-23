/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
const domain = 'email.derrxb.com';
const mailgun = require('mailgun-js')({
  domain,
  apiKey: process.env.MAILGUN,
  publicApiKey: process.env.MAILGUN_PUBLIC,
});

const Yup = require('yup');
const { markdownToHtml } = require('./utils');

const errs = {
  activity: 'We need to know what activity you are interested in',
  category: 'We need to know what area of Belize you wish to visit',
  customItems: 'We need at least 1 area/category',
  email: 'We need your email so we can respond to your request',
  groupProgram: 'Please let us know which program you are interested in',
  groupSize: 'Please let us know how many people are in your party',
  message: 'Please let us know more about your request',
  name: 'Please let us know who you are.',
  numberOfDays: 'This will allow us to provide a more useful quote',
  scheduleDate: "If you don't know the exact date, an estimate is fine",
  shuttleSize: 'Let us know your shuttle capacity',
  typeOfContact: 'Please let us know what type of service you are interested in.',
};

const generalSchema = Yup.object().shape({
  name: Yup.string(errs.name).required(errs.name),
  message: Yup.string().required(errs.message),
  scheduleDate: Yup.date().required(errs.scheduleDate),
  email: Yup.string()
    .email(errs.email)
    .required(errs.email),
  typeOfContact: Yup.string()
    .matches(
      /(Private Tour|Shuttle Rental\/Charter|Group Program|Custom Group Program)/,
      errs.typeOfContact
    )
    .required(errs.typeOfContact),
});

const tourSchema = Yup.object().shape({
  activity: Yup.string().required(errs.activity),
});

const shuttleSchema = Yup.object().shape({
  numberOfDays: Yup.string().required(errs.numberOfDays),
  shuttleSize: Yup.string().matches(/(14 Pax|22 Pax|44 Pax)/, errs.shuttleSize),
});

const groupProgramSchema = Yup.object().shape({
  groupProgram: Yup.string().required(errs.groupProgram),
  groupSize: Yup.number()
    .min(1, errs.groupSize)
    .required(errs.groupSize),
});

const customGroupProgramSchema = Yup.object().shape({
  customItems: Yup.array()
    .of(
      Yup.object().shape({
        category: Yup.string().required(errs.category),
      })
    )
    .min(1, errs.customItems)
    .required(errs.customItems),
});

const getValidationSchema = type => {
  if (type) {
    switch (type) {
      case 'Private Tour':
        return generalSchema.concat(tourSchema);
      case 'Shuttle Rental/Charter':
        return generalSchema.concat(shuttleSchema);
      case 'Group Program':
        return generalSchema.concat(groupProgramSchema);
      case 'Custom Group Program':
        return generalSchema.concat(customGroupProgramSchema);
      default: {
        console.log(`Unknown type \`${type}\` supplied to \`getValidationSchema\`.`);
        return generalSchema;
      }
    }
  }

  return generalSchema;
};

const contactTypeSchema = Yup.object().shape({
  typeOfContact: Yup.string()
    .matches(
      /(Private Tour|Shuttle Rental\/Charter|Group Program|Custom Group Program)/,
      'Please choose a valid contact type'
    )
    .required('Please choose a valid contact type'),
});

const contact = {
  groupProgram: 'Group Program',
  tour: 'Private Tour',
  shuttle: 'Shuttle Rental/Charter',
  customGroupProgram: 'Custom Group Program',
};

exports.handler = async event => {
  const values = JSON.parse(event.body);

  try {
    // Ensure a valid `contact type` is present since that is used to
    // determine the type of schema to use.
    await contactTypeSchema.validate({ typeOfContact: values.typeOfContact });

    // Validate All values
    await getValidationSchema(values.typeOfContact).validate(values);

    // Email Design
    const message = `${values.message}\n\n### DETAILS\n\n* Customer: ${values.name} (${
      values.email
    })\n\n* Schedule Date: ${values.scheduleDate}\n\n${
      values.typeOfContact === contact.tour
        ? `* Activity: **${values.activity}**\n\n`
        : values.typeOfContact === contact.groupProgram
        ? `* Group Program: ${values.groupProgram}\n\n* ${values.groupSize}`
        : values.typeOfContact === contact.shuttle
        ? `* Shuttle Size: ${values.shuttleSize}\n\n* Duration: ${values.numberOfDays}`
        : values.typeOfContact === contact.customGroupProgram
        ? values.customItems.reduce(
            (acc, curr, index) =>
              `${acc}\n\n#### Item ${index + 1}\n\n* Category: ${curr.category}\n\n* ${`${
                curr.numberOfDays > 0 ? curr.numberOfDays : 'Unspecified amount of '
              }`} days\n\n* ${curr.about || 'No details provided'}\n\n`,
            '### CUSTOM ITINERARY\n\n'
          )
        : null
    }`;

    const subject =
      values.typeOfContact === contact.tour
        ? values.activity
        : values.typeOfContact === contact.groupProgram
        ? values.groupProgram
        : values.typeOfContact === contact.shuttle
        ? `Shuttle inquiry`
        : values.typeOfContact === contact.customGroupProgram
        ? 'Custom group program'
        : null;

    const messageAsHtml = await markdownToHtml(message);
    const data = {
      subject: `New Request Received: ${subject}`,
      to: 'BZE Tours <tours@bzetours.com>',
      from: `${JSON.parse(event.body).name} <${JSON.parse(event.body).email}>`,
      text: message,
      html: messageAsHtml,
    };

    const result = await mailgun.messages().send(data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Message sent successfully ${result}` }),
    };
  } catch (error) {
    if (error.name === 'ValidationError') {
      return {
        statusCode: 422,
        body: JSON.stringify({
          errors: {
            [error.path]: error.message,
          },
        }),
      };
    }

    return { statusCode: 500, body: error.toString() };
  }
};
