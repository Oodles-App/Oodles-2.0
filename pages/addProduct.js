import React from 'react'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

export default function addProduct() {
  const user = useSelector(state => state.user);
  const {register, handleSubmit, errors, reset} = useForm();
  console.log(user);
  return (
    <div>
      <h1>Add Product</h1>
      <form>
        <div>
          <label htmlFor="amount">
            Amount
          </label>
          <input type="number" />
        </div>

      </form>
    </div>
  )
}
