import React from "react";

const Label = ({ label }: any) => {
	return (
		<label className='block text-primary-500 font-medium text-sm leading-none mb-2'>
			{label}
		</label>
	);
};

export default Label;
