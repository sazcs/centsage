import type React from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SmartEntry() {
	const [value, setValue] = useState('');

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('[v0] Smart Entry submitted:', value);
		setValue('');
	};

	return (
		<form onSubmit={onSubmit} className='flex items-center gap-2'>
			<label htmlFor='smart-entry' className='sr-only'>
				Smart Transaction Entry
			</label>
			<Input
				id='smart-entry'
				placeholder='e.g. "Starbucks $4.50 Coffee"'
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className='flex-1'
			/>
			<Button type='submit'>Submit</Button>
		</form>
	);
}
