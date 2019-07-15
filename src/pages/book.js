/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { string, object } from 'yup';
import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage as FormikErrorMessage,
} from 'formik';
// import Reaptcha from 'reaptcha';
import Layout from '../components/layout';
import { H1 } from '../components/shared';
import Media from '../components/shared/Media';

const Form = styled(FormikForm)`
  width: 600px;
  padding: 1em;
  margin-right: auto;
  margin-left: auto;

  ${Media.lessThan('tablet')`
    width: auto;
    padding: 1em;
    margin: 0;
  `};
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.8em;

  label {
    font-weight: 600;
    margin-bottom: 0.3em;
  }
`;

const Input = styled(Field)`
  height: 48px;
  font-size: 16px;
  background: #f0eded;
  border: 2px solid #f0eded;
  border-radius: 3px;
  padding: 0.4em 1em 0.4em 0.5em;
  appearance: none;
  -webkit-appearance: none;

  &:focus {
    outline: none;
    border: 2px solid #fcd307;
  }
`;

const ErrorMessage = styled(FormikErrorMessage)`
  font-size: 14px;
  color: red;
`;

/**
 * Wraps the firstName and lastName group
 */
const UserName = styled.div`
  display: flex;
  flex-direction: column;

  div {
    width: 100%;
  }

  ${Media.greaterThan('tablet')`
    flex-direction: row;

    div {
      width: 50%;

      :first-child {
        margin-right: 1em;
      }
    }
  `};
`;

const Button = styled.button`
  height: 48px;
  padding: 0.2em 1em;
  font-weight: 600;
  text-align: center;
  border-radius: 3px;
  border: 2px solid #ddd;

  &:hover,
  &:focus {
    background: #fcd307;
    border: 2px solid #fcd307;
  }
`;

const initialValues = {
  'bot-field': '',
  'form-name': 'contact',
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
};

const schema = object().shape({
  firstName: string().required('Please let us know who you are'),
  lastName: string().required('Please let us know who you are'),
  email: string()
    .email('We need to know your email so we can respond to your message')
    .required('We need to know your email so we can respond to your message'),
  subject: string().required('Subject is required'),
  message: string().required('Message is required'),
});

const Book = () => {
  const handleSubmit = values => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: values,
      url: 'https://derrxb.netlify.com',
    };

    axios(options)
      .then(() => window.console.log('form submitting'))
      .catch(error => window.console.log(error));
  };

  return (
    <Layout>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={schema}
      >
        {({ resetForm, ...rest }) => (
          <Form name="contact-us" data-netlify="true" data-netlify-honeypot="bot-field">
            <H1>Feel free to reach out to us below! 🏎</H1>

            <UserName>
              <Group>
                <label htmlFor="firstName">First Name</label>
                <Input component="input" id="firstName" name="firstName" />
              </Group>

              <Group>
                <label htmlFor="lastName">Last Name</label>
                <Input component="input" id="lastName" name="lastName" />
              </Group>
            </UserName>
            <Group>
              <label htmlFor="email">What is your email?</label>
              <Input component="input" id="email" name="email" type="email" />
              <ErrorMessage component="span" name="email" />
            </Group>
            <Group>
              <label htmlFor="subject">What service are you interested in?</label>
              <Input component="input" id="subject" name="subject" />
              <ErrorMessage component="span" name="subject" />
            </Group>
            <Group>
              <label htmlFor="message">Can you tell us more?</label>
              <Input
                component="textarea"
                id="message"
                name="message"
                style={{ height: '140px' }}
              />
              <ErrorMessage component="span" name="message" />
            </Group>

            <Field type="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value="contact" />

            {/* <Reaptcha
              ref={rcRef}
              sitekey="your site key goes here"
              data-netlify-recaptcha="true"
              onError={onError}
              onExpire={onExpire}
              onVerify={onVerify}
              onLoad={() => onLoad(() => resetForm)}
              size="invisible"
            /> */}

            <Button type="submit">Send Message</Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Book;
