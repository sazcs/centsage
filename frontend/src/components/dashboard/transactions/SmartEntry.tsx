import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CATEGORIES } from '@/lib/categories';
import { toast } from 'sonner';
import apiClient from '@/api/axios';

interface SmartEntryProps {
	onTransactionAdded: () => void;
}

export function SmartEntry({
	onTransactionAdded: onTransactionChange,
}: SmartEntryProps) {
	const [value, setValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [editDescription, setEditDescription] = useState('');
	const [editAmount, setEditAmount] = useState('');
	const [editCategory, setEditCategory] = useState('');
	const [editDate, setEditDate] = useState<Date | undefined>();
	const [editType, setEditType] = useState<'income' | 'expense'>('expense');

	const handleParse = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!value) return;

		setLoading(true);
		try {
			const parseRes = await apiClient.post('/transactions/parse', {
				text: value,
			});
			const parsedData = parseRes.data;

			setEditDescription(parsedData.description || '');
			setEditAmount(String(parsedData.amount || ''));
			setEditCategory(parsedData.category || 'Other');
			setEditDate(parsedData.date ? new Date(parsedData.date) : new Date());
			setEditType(parsedData.type || 'expense');

			setIsConfirmOpen(true);
		} catch (error) {
			console.error('Failed to parse transaction:', error);
			toast.error('AI Parsing Failed', {
				description:
					'Could not understand the transaction. Please try rephrasing.',
			});
		} finally {
			setLoading(false);
		}
	};

	const handleConfirmSave = async () => {
		setIsSubmitting(true);

		const amountNumber = parseFloat(editAmount);
		if (isNaN(amountNumber) || amountNumber <= 0 || !editDate) {
			toast.error('Invalid Data', {
				description: 'Please ensure all fields are correct.',
			});
			setIsSubmitting(false);
			return;
		}

		const finalData = {
			description: editDescription,
			amount: amountNumber,
			category: editCategory,
			date: format(editDate, 'yyyy-MM-dd'),
			type: editType,
		};

		try {
			await apiClient.post('/transactions', finalData);
			toast.success('Transaction Added', {
				description: 'Your transaction has been saved.',
			});
			onTransactionChange();
			setValue('');
			setIsConfirmOpen(false);
		} catch (error) {
			console.error('Failed to add transaction:', error);
			toast.error('Save Failed', {
				description: 'Could not save the transaction.',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<form onSubmit={handleParse} className='flex items-center gap-2'>
				<label htmlFor='smart-entry' className='sr-only'>
					Smart Transaction Entry
				</label>
				<Input
					id='smart-entry'
					placeholder='e.g., "Starbucks $6.50 coffee"'
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className='flex-1'
					disabled={loading}
				/>
				<Button type='submit' disabled={loading}>
					{loading ? 'Parsing...' : 'Submit'}
				</Button>
			</form>

			<Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Transaction</DialogTitle>
						<DialogDescription>
							Review and edit the details parsed by the AI before saving.
						</DialogDescription>
					</DialogHeader>
					<div className='space-y-4 py-4'>
						<div className='space-y-2'>
							<Label htmlFor='description'>Description</Label>
							<Input
								id='description'
								value={editDescription}
								onChange={(e) => setEditDescription(e.target.value)}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='amount'>Amount</Label>
							<Input
								id='amount'
								type='number'
								step='0.01'
								value={editAmount}
								onChange={(e) => setEditAmount(e.target.value)}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='category'>Category</Label>
							<Select value={editCategory} onValueChange={setEditCategory}>
								<SelectTrigger>
									<SelectValue placeholder='Select a category' />
								</SelectTrigger>
								<SelectContent>
									{CATEGORIES.map((cat) => (
										<SelectItem key={cat.name} value={cat.name}>
											{cat.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className='space-y-2'>
							<Label>Date</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={'outline'}
										className={cn(
											'w-full justify-start text-left font-normal',
											!editDate && 'text-muted-foreground'
										)}
									>
										<CalendarIcon className='mr-2 h-4 w-4' />
										{editDate ? (
											format(editDate, 'PPP')
										) : (
											<span>Pick a date</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0'>
									<Calendar
										mode='single'
										selected={editDate}
										onSelect={setEditDate}
										autoFocus={true}
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>
					<DialogFooter>
						<Button variant='outline' onClick={() => setIsConfirmOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleConfirmSave} disabled={isSubmitting}>
							{isSubmitting ? 'Saving...' : 'Confirm & Save'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
