import React from 'react';

const FormInput = React.forwardRef(
    ({ 
        type, 
        name, 
        label, 
        value, 
        onChange, 
        onBlur, 
        touched, 
        error, 
        placeholder, 
        options, 
        checked, 
        onToggle, 
        required, 
        customClass, // Custom class for styling
        style, // Inline styles
        noMargin // Prop to control margin
    }, ref) => {
        const getInputClassName = () => {
            const baseClass = customClass || 'form-control'; // Use custom class if provided
            if (touched) {
                return error ? `${baseClass} is-invalid` : `${baseClass} is-valid`;
            }
            return baseClass;
        };

        return (
            <div className={`form-group ${noMargin ? '' : 'mb-3'}`}>
                <label htmlFor={name}>{label}</label>
                {type === 'text' || type === 'number' || type === 'date' ? (
                    <input
                        type={type}
                        id={name}
                        name={name}
                        className={getInputClassName()} // Apply validation classes
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        ref={ref} // Attach ref
                        required={required}
                        style={style} // Apply inline styles
                    />
                ) : type === 'select' ? (
                    <select
                        id={name}
                        name={name}
                        className={getInputClassName()} // Apply validation classes
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={ref}
                        required={required}
                        style={style} // Apply inline styles
                    >
                        <option value="" disabled>
                            {placeholder}
                        </option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : type === 'switch' ? (
                    <div className="form-switch">
                        <input
                            type="checkbox"
                            id={name}
                            name={name}
                            className="form-check-input"
                            checked={checked}
                            onChange={onToggle}
                        />
                        <label htmlFor={name} className="form-check-label">
                            {value}
                        </label>
                    </div>
                ) : null}
                {touched && error && <div className="invalid-feedback">{error}</div>}
            </div>
        );
    }
);

export default FormInput;
