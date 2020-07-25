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
  name: 'Please let us know who you are',
  email: 'We need your email so we can respond to your request',
  message: 'Please let us know more about your request',
  title: 'Please let us know what type of service you are interested in.',
};

const generalSchema = Yup.object().shape({
  title: Yup.string().required(errs.message),
  message: Yup.string().required(errs.message),
  email: Yup.string()
    .email(errs.email)
    .required(errs.email),
});

const getValidationSchema = () => generalSchema;

exports.handler = async event => {
  const values = JSON.parse(event.body);

  try {
    // Validate All values
    await getValidationSchema().validate(values);

    let name = '';
    name += values.firstName ? `${values.firstName}` : '';
    name += values.lastName ? `${values.lastName}` : '';

    const messageAsHtml = await markdownToHtml(values.message);
    const data = {
      subject: `${values.title}`,
      to: 'Derrick Bol <hello@derrxb.com>',
      from: `${name} <${JSON.parse(event.body).email}>`,
      text: values.message,
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
