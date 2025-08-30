import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
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
import type { Transaction } from '@/pages/DashboardPage';
import { CATEGORIES } from '@/lib/categories';
import axios from 'axios';
import { toast } from 'sonner';
import React, { useState, useEffect } from 'react';

interface EditTransactionDialogProps {
	transaction: Transaction;
	onTransactionChange: () => void;
	children: React.ReactNode;
}

export function EditTransactionDialog({
	transaction,
	onTransactionChange,
	children,
}: EditTransactionDialogProps) {
	const [open, setOpen] = useState(false);

	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState('');
	const [category, setCategory] = useState('');
	const [date, setDate] = useState<Date | undefined>();
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (open) {
			setDescription(transaction.description);
			setAmount(String(transaction.amount));
			setCategory(transaction.category);
			setDate(new Date(transaction.date));
		}
	}, [open, transaction]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Manual validation
		const amountNumber = parseFloat(amount);
		if (isNaN(amountNumber) || amountNumber <= 0) {
			toast.error('Invalid Amount', {
				description: 'Please enter a positive number.',
			});
			setIsSubmitting(false);
			return;
		}
		if (!date) {
			toast.error('Invalid Date', { description: 'Please select a date.' });
			setIsSubmitting(false);
			return;
		}

		const updatedData = {
			description,
			amount: amountNumber,
			category,
			date: format(date, 'yyyy-MM-dd'),
			type: transaction.type,
		};

		try {
			await axios.put(
				`http://localhost:5001/api/transactions/${transaction._id}`,
				updatedData
			);
			toast.success('Transaction Updated', {
				description: 'Your transaction has been saved.',
			});
			onTransactionChange();
			setOpen(false);
		} catch (error) {
			console.error('Failed to update transaction', error);
			toast.error('Update Failed', {
				description: 'Could not save your changes.',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit Transaction</DialogTitle>
					<DialogDescription>
						Make changes to your transaction here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className='space-y-4 pt-4'>
					<div className='space-y-2'>
						<Label htmlFor='description'>Description</Label>
						<Input
							id='description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='amount'>Amount</Label>
						<Input
							id='amount'
							type='number'
							step='0.01'
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='category'>Category</Label>
						<Select value={category} onValueChange={setCategory}>
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
										!date && 'text-muted-foreground'
									)}
								>
									<CalendarIcon className='mr-2 h-4 w-4' />
									{date ? format(date, 'PPP') : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0'>
								<Calendar
									mode='single'
									selected={date}
									onSelect={setDate}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>
					<DialogFooter>
						<Button
							type='button'
							variant='secondary'
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
						<Button type='submit' disabled={isSubmitting}>
							{isSubmitting ? 'Saving...' : 'Save Changes'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
