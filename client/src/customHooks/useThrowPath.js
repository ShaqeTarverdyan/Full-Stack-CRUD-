import React from 'react';
import { useHistory } from 'react-router-dom';


export const useThrowPath = (path) => {
    let history = useHistory();
    return history.push(path);
}
