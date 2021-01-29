import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword1, setKeyword1] = useState('');
  const [keyword2, setKeyword2] = useState('');

  const keyword = { keyword1, keyword2 };

  const submitHandler = e => {
    e.preventDefault();

    if (keyword1.trim() && keyword2.trim()) {
      history.push(`/search/${keyword1}&${keyword2}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='search1'
        onChange={e => setKeyword1(e.target.value)}
        placeholder='Search Doctor or by spec'
        className='mr-sm2 ml-sm-5'
      ></Form.Control>
      <Form.Control
        type='text'
        name='search2'
        onChange={e => setKeyword2(e.target.value)}
        placeholder='Search ville'
        className='mr-sm2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
