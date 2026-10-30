import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { registerUser } from '../../services/authService.js'

const EMAIL_PATTERN = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S{7,}$/
const inputClassName =
  'mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100'

function getServerError(error) {
  const data = error.response?.data

  if (typeof data === 'string') return data
  if (data?.message) return data.message

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors.map((item) => item.defaultMessage || item.message).join(' ')
  }

  if (error.response?.status === 409) {
    return 'An account with this email or phone number already exists.'
  }

  return error.code === 'ERR_NETWORK'
    ? 'Unable to reach the server. Please confirm that the backend is running.'
    : 'Registration failed. Please try again.'
}

function RegistrationForm() {
  const [formMessage, setFormMessage] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values) {
    setFormMessage(null)

    try {
      const user = await registerUser(values)
      reset()
      setFormMessage({
        type: 'success',
        text: `Registration successful for ${user.fullName || values.fullName}.`,
      })
    } catch (error) {
      setFormMessage({ type: 'error', text: getServerError(error) })
    }
  }

  function fieldError(name) {
    return errors[name] ? (
      <p className="mt-1.5 text-sm text-red-600" role="alert">
        {errors[name].message}
      </p>
    ) : null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {formMessage && (
        <div
          className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
            formMessage.type === 'success'
              ? 'border-green-200 bg-green-50 text-green-800'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
          role={formMessage.type === 'error' ? 'alert' : 'status'}
        >
          {formMessage.text}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label htmlFor="fullName" className="text-sm font-medium text-slate-700">Full name</label>
          <input
            id="fullName"
            type="text"
            className={inputClassName}
            placeholder="Enter your full name"
            {...register('fullName', {
              required: 'Full name is required.',
              minLength: { value: 2, message: 'Full name must be at least 2 characters.' },
              maxLength: { value: 25, message: 'Full name must be 25 characters or fewer.' },
            })}
          />
          {fieldError('fullName')}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="text-sm font-medium text-slate-700">Phone number</label>
          <input
            id="phoneNumber"
            type="tel"
            className={inputClassName}
            placeholder="Enter your phone number"
            {...register('phoneNumber', {
              required: 'Phone number is required.',
              setValueAs: (value) => value.trim(),
            })}
          />
          {fieldError('phoneNumber')}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-700">Email address</label>
          <input
            id="email"
            type="email"
            className={inputClassName}
            placeholder="you@example.com"
            {...register('email', {
              required: 'Email is required.',
              pattern: { value: EMAIL_PATTERN, message: 'Enter a valid email address.' },
            })}
          />
          {fieldError('email')}
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label>
          <input
            id="password"
            type="password"
            className={inputClassName}
            placeholder="Create a password"
            {...register('password', {
              required: 'Password is required.',
              pattern: {
                value: PASSWORD_PATTERN,
                message: 'Password needs at least 7 characters, uppercase, lowercase, and a number.',
              },
            })}
          />
          {fieldError('password')}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            className={inputClassName}
            placeholder="Re-enter your password"
            {...register('confirmPassword', {
              required: 'Please confirm your password.',
              validate: (value) =>
                value === getValues('password') || 'Passwords do not match.',
            })}
          />
          {fieldError('confirmPassword')}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  )
}

export default RegistrationForm