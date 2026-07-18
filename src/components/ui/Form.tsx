import { Label } from '@/components/ui/Label';
import { cn } from '@/utils/cn';
import * as React from 'react';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';

// ─────────────────────────────────────────────────────────
// Form = FormProvider re-export
// ─────────────────────────────────────────────────────────
const Form = FormProvider;

// ─────────────────────────────────────────────────────────
// FormField context — supplies field name to child consumers
// ─────────────────────────────────────────────────────────
interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    // React 19: render Context directly as a provider
    <FormFieldContext value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext>
  );
}

// ─────────────────────────────────────────────────────────
// useFormField — reads field state from RHF context
// ─────────────────────────────────────────────────────────
function useFormField() {
  // React 19: use() instead of useContext()
  const fieldContext = React.use(FormFieldContext);
  const itemContext = React.use(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext.name) {
    throw new Error('useFormField must be used inside <FormField>');
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}

// ─────────────────────────────────────────────────────────
// FormItem — wrapper providing stable IDs via context
// ─────────────────────────────────────────────────────────
interface FormItemContextValue {
  id: string;
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId();
  return (
    // React 19: render Context directly as a provider
    <FormItemContext value={{ id }}>
      <div className={cn('space-y-2', className)} {...props} />
    </FormItemContext>
  );
}
FormItem.displayName = 'FormItem';

// ─────────────────────────────────────────────────────────
// FormLabel
// ─────────────────────────────────────────────────────────
function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { error, formItemId } = useFormField();
  return (
    <Label
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}
FormLabel.displayName = 'FormLabel';

// ─────────────────────────────────────────────────────────
// FormControl — passes aria attributes to the wrapped input
// ─────────────────────────────────────────────────────────
function FormControl({ ...props }: React.ComponentProps<'div'>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();
  return (
    <div
      id={formItemId}
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}
FormControl.displayName = 'FormControl';

// ─────────────────────────────────────────────────────────
// FormDescription
// ─────────────────────────────────────────────────────────
function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();
  return (
    <p
      id={formDescriptionId}
      className={cn('text-xs text-muted-foreground', className)}
      {...props}
    />
  );
}
FormDescription.displayName = 'FormDescription';

// ─────────────────────────────────────────────────────────
// FormMessage — shows validation error or a custom message
// ─────────────────────────────────────────────────────────
function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();
  const body = error ? (error.message ?? '') : children;

  if (!body) return null;

  return (
    <p
      id={formMessageId}
      className={cn('text-xs font-medium text-destructive', className)}
      role='alert'
      {...props}
    >
      {body}
    </p>
  );
}
FormMessage.displayName = 'FormMessage';

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField, // eslint-disable-line react-refresh/only-export-components
};
