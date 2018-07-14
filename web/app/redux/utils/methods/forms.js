import React from 'react';
import PropTypes from 'prop-types';
import { __CLIENT__ } from '../../../utils';
import DateTimeField from '@starbird/react-bootstrap-datetimepicker';


export const renderIconInput = ({input, classNameOuter='', placeholder='', autoComplete='true', icon, type, cname}) => (
	<div className={`input-group ${cname ? `mb-${cname}` : ''} ${classNameOuter}`}>
		<div className="input-group-prepend">
			<span className="input-group-text">
				<i className={icon}></i>
			</span>
		</div>
		<input {...input} autoComplete={autoComplete} type={type} className="form-control" placeholder={placeholder} />
	</div>
);

export const renderInput = ({input, error, classNameInput='', classNameOuter='', type='text', label='', cname=0, autoComplete='true', id='', placeholder=''}) => (
	<div className={`input-group ${cname ? `mb-${cname}` : ''} ${classNameOuter}`}>
		<label>{label}</label>
		<input {...input} autoComplete={autoComplete} type={type} className={`${classNameInput} form-control`} id={id} placeholder={placeholder} />
        {error && <p className="text-danger">{error}</p>}
	</div>
);

export const renderTextarea = ({input, classNameInput='', classNameOuter='', label, id='', placeholder=''}) => (
	<div className={`input-group ${classNameOuter}`}>
		<label>{label}</label>
		<textarea {...input} type="text" className={`form-control ${classNameInput}`} id={id} placeholder={placeholder}/>
	</div>
);

// eslint-disable global-require
export const renderQuillTextarea = ({input, custom, label, onChanges}) => {
	const { default: RichTextEditor } = require('react-rte');
	return (
		<div className={`input-group f-column`}>
			<label className="w-100">{label}</label>
            <RichTextEditor className="w-100" value={custom} onChange={onChanges} />
		</div>
	);
};
// eslint-enable global-require

export const renderDateInput = ({input, label, date, onChanges, placeholder="Please enter a date and time"}) => (
    <div className="f-column w-100">
        <label className="w-100">{label}</label>
        <DateTimeField
            {...input}
            onChange={onChanges.bind(this)}
            defaultText={placeholder}
            inputFormat="MM/DD/YYYY hh:mm a"
            viewMode="date"
            dateTime={date}
        />
    </div>
);

export const textInput = ({input, placeholder="Leave a comment..."}) => (
	<input {...input} type="text" placeholder={placeholder} className="form-control"/>
);

export const textareaInput = ({input, placeholder="Leave a comment... ", className=''}) => (
	<textarea {...input} type="text" placeholder={placeholder} className={`form-control ${className}`}/>
);

export const radioInput = ({input, label, checked=false, click}) => (
	<div className="radio" onClick={click}>
		<label>{label}</label>
		<input {...input} checked={checked} type="radio" style={{marginRight: '5px'}} />
	</div>
);

export const checkBoxInput = ({input, LoaderComponent=() => <span />, loader=null, classNameLabel='', classNameInput='', classNameOuter='',  label, checked=false, click}) => (
	<div className={`check ${classNameOuter}`} onClick={click}>
		<label className={classNameLabel}>{label}</label>
		{!loader ? <input className={classNameInput} {...input} checked={checked} type="checkbox" style={{marginRight: '5px'}} />
        : <LoaderComponent />}
	</div>
);

export const selectInput = ({ input, classNameOuter='', classNameOption='', classNameSelect='', options=[], label, value }) => (
	<div className={`select ${classNameOuter}`}>
		<label>{label}</label>
		<select {...input} className={classNameSelect} value={value}>
            <option />
            {options.length > 0 && options.map((e, i) => (
                <option key={i} selected={e.selected} className={classNameOption} value={e.value}>
                    {e.label}
                </option>
            ))}
		</select>
	</div>
);
