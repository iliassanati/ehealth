import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword1, setKeyword1] = useState('');
  const [keyword2, setKeyword2] = useState('');

  const submitHandler = e => {
    e.preventDefault();

    if (keyword1.trim() && keyword2.trim()) {
      history.push(`/search/${keyword1}&${keyword2}`);
    } else {
      history.push('/search');
      alert('Enter les donnees pour chercher un medecin');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='search1'
        onChange={e => setKeyword1(e.target.value)}
        placeholder='Search Doctor or by spec'
        className='mr-sm2 '
        style={{ paddingRight: '50px', paddingLeft: '50px' }}
      ></Form.Control>
      <Form.Control
        type='text'
        name='search2'
        onChange={e => setKeyword2(e.target.value)}
        placeholder='Search ville'
        className='mr-sm2 ml-sm-5'
        style={{ paddingRight: '50px', paddingLeft: '50px' }}
      ></Form.Control>
      <Button type='submit' variant='btn btn-primary' className='ml-sm-5 my-3'>
        <i className='fas fa-search'></i> Search
      </Button>
    </Form>
  );
};

export default SearchBox;
