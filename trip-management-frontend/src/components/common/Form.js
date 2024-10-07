// import React from 'react';

// const Form = ({ fields, formData, handleChange, handleBlur, errors, inputClass }) => {
//     return (
//         <form>
//             {fields.map((field) => (
//                 <div className="mb-3" key={field.name}>
//                     <label className="form-label">{field.label}</label>
//                     {field.type === 'select' ? (
//                         <select
//                             className={inputClass(field.name)}
//                             id={field.name}
//                             name={field.name}
//                             value={formData[field.name]}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             required={field.required}
//                         >
//                             <option value="" disabled>{field.placeholder}</option>
//                             {field.options.map((option) => (
//                                 <option key={option.value} value={option.value}>
//                                     {option.label}
//                                 </option>
//                             ))}
//                         </select>
//                     ) : (
//                         <input
//                             type={field.type}
//                             className={inputClass(field.name)}
//                             id={field.name}
//                             name={field.name}
//                             value={formData[field.name]}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             placeholder={field.placeholder}
//                             required={field.required}
//                         />
//                     )}
//                     {errors[field.name] && <div className="invalid-feedback">{errors[field.name]}</div>}
//                 </div>
//             ))}
//         </form>
//     );
// };

// export default Form;











// import React, { useState } from 'react';

// const Form = ({ fields, onSubmit, validateField, formErrors, touched, handleChange, handleBlur }) => {
//     return (
//         <form onSubmit={onSubmit}>
//             {fields.map((field, index) => {
//                 const inputClass = touched[field.name] && formErrors[field.name]
//                     ? 'form-control is-invalid'
//                     : touched[field.name] && !formErrors[field.name]
//                     ? 'form-control is-valid'
//                     : 'form-control';

//                 return (
//                     <div className="mb-3" key={index}>
//                         <label className="form-label">{field.label}:</label>

//                         {field.type === 'text' && (
//                             <input
//                                 type="text"
//                                 className={inputClass}
//                                 id={field.name}
//                                 name={field.name}
//                                 value={field.value}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 placeholder={field.placeholder}
//                                 required={field.required}
//                             />
//                         )}

//                         {field.type === 'date' && (
//                             <input
//                                 type="date"
//                                 className={inputClass}
//                                 id={field.name}
//                                 name={field.name}
//                                 value={field.value}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 required={field.required}
//                             />
//                         )}

//                         {field.type === 'select' && (
//                             <select
//                                 className={inputClass}
//                                 id={field.name}
//                                 name={field.name}
//                                 value={field.value}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 required={field.required}
//                             >
//                                 <option value="" disabled>{field.placeholder}</option>
//                                 {field.options.map((option, idx) => (
//                                     <option key={idx} value={option.value}>
//                                         {option.label}
//                                     </option>
//                                 ))}
//                             </select>
//                         )}

//                         {field.type === 'checkbox' && (
//                             <div className="form-check">
//                                 <input
//                                     type="checkbox"
//                                     className="form-check-input"
//                                     id={field.name}
//                                     name={field.name}
//                                     checked={field.value}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 />
//                                 <label className="form-check-label" htmlFor={field.name}>
//                                     {field.label}
//                                 </label>
//                             </div>
//                         )}

//                         {field.type === 'radio' && (
//                             <div>
//                                 {field.options.map((option, idx) => (
//                                     <div className="form-check" key={idx}>
//                                         <input
//                                             type="radio"
//                                             className="form-check-input"
//                                             id={`${field.name}-${option.value}`}
//                                             name={field.name}
//                                             value={option.value}
//                                             checked={field.value === option.value}
//                                             onChange={handleChange}
//                                             onBlur={handleBlur}
//                                         />
//                                         <label className="form-check-label" htmlFor={`${field.name}-${option.value}`}>
//                                             {option.label}
//                                         </label>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}

//                         {formErrors[field.name] && <div className="invalid-feedback">{formErrors[field.name]}</div>}
//                     </div>
//                 );
//             })}

//             <button type="submit" className="btn btn-primary w-100">Submit</button>
//         </form>
//     );
// };

// export default Form;




















