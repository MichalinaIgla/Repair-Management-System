import { TextField, TextFieldProps } from '@material-ui/core';
import { FieldProps, useField } from 'formik';
import React from 'react';

// interface Props extends FieldProps, TextFieldProps  {
//     label: string;
    
// }


export const OrderField: React.FC<FieldProps & TextFieldProps> = ({label, field, required, type}) => {
    const [fieldUsed, meta] = useField<{}>(field);
    const errorText = meta.error && meta.touched ? meta.error: "";
    // console.log(!!errorText);
    // console.log(fieldUsed);
    return (
        <TextField
            label={label}
            required={required}
            {...fieldUsed}
            helperText={errorText}
            error={!!errorText}
            type={type}
        />
    )
}

export const EditOrderField: React.FC<FieldProps & TextFieldProps> = ({label, field, required, type}) => {
    const [fieldUsed, meta] = useField<{}>(field);
    const errorText = meta.error && meta.touched ? meta.error: "";
    // console.log("defaultValue",defaultValue);
    // console.log(fieldUsed)
    return (
        <TextField
            fullWidth 
            variant="filled"
            defaultValue
            label={label}
            required={required}
            {...fieldUsed}
            helperText={errorText}
            error={!!errorText}
            type={type}
        />
    );
};



// export const OrderField: React.FC<FieldAttributes<{}>> = ({
//     // label,
//     ...props
//   }) => {
//     const [field, meta] = useField<{}>(props);
//     const errorText = meta.error && meta.touched ? meta.error : "";
//     return (
//       <TextField
//     //   label={label}
//         {...field}
//         helperText={errorText}
//         error={!!errorText}
//       />
//     );
//   };