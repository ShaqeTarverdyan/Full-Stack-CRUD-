import React from 'react';
import { Wrapper, Error } from './Input';
import { StyledSelect,StyledOption } from '../../generalStyles';

const SelectComponent = ({ field, form: { errors },serverError, types, title }) => {
    return (
        <Wrapper>
            <StyledSelect {...field}>
                <StyledOption value="" >{title}</StyledOption>
                {
                    types.map(({id, name, value}) => (
                        <StyledOption key={id} value={id}>{name}</StyledOption>
                    ))
                }
            </StyledSelect>
            <Error show={errors[field.name] || serverError}>
                {errors[field.name]}
                {serverError}
            </Error>
        </Wrapper>
    )
}

export default SelectComponent;