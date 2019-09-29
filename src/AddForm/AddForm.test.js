import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddForm from './AddForm'

describe(`AddForm component`, () => {
  const props = {
    className: 'test-class-name',
    children: <p>test children</p>,
    'data-other': 'test-other-prop'
  }

  it('renders a form.NotefulForm by default', () => {
    const wrapper = shallow(<AddForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the NotefulForm given props', () => {
    const wrapper = shallow(<AddForm {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})