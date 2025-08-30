import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface SmartEntryProps {
	onTransactionAdded: () => void;
}

export function SmartEntry({ onTransactionAdded }: SmartEntryProps) {
	const [value, setValue] = useState('');
	const [loading, setLoading] = useState(false);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!value) return;

		setLoading(true);
		try {
			const parseRes = await axios.post(
				'http://localhost:5001/api/transactions/parse',
				{ text: value }
			);
			const parsedData = parseRes.data;
			await axios.post('http://localhost:5001/api/transactions', parsedData);
			onTransactionAdded();
			setValue('');
		} catch (error) {
			console.error('Failed to add transaction:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={onSubmit} className='flex items-center gap-2'>
			<label htmlFor='smart-entry' className='sr-only'>
				Smart Transaction Entry
			</label>
			<Input
				id='smart-entry'
				placeholder='e.g. "Starbucks $6.50 coffee"'
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className='flex-1'
				disabled={loading}
			/>
			<Button type='submit' disabled={loading}>
				{loading ? 'Adding...' : 'Submit'}
			</Button>
		</form>
	);
}
