import { FC, useState } from 'react'

import SignUpFormFirstStep from './components/sign-up-form-first-step/sign-up-form-first-step'
import SignUpFormSecondStep from './components/sign-up-form-second-step/sign-up-form-second-step'

interface SignUpDetails {
  fullName: string,
  email: string,
  password: string,
}

const SignUpScreen: FC = () => {
  const [step, setStep] = useState<number>(0)

  const [details, setDetails] = useState<SignUpDetails>({
    fullName: '',
    email: '',
    password: '',
  })

  const onFirstStepSubmit = (data: Omit<SignUpDetails, 'password'>) => {
    setDetails((prev) => ({ ...prev, ...data }))
    setStep(1)
    console.log(data)
  }

  const onSecondStepSubmit = (data: {password: string, confirmPassword: string}) => {
    console.log(data)
  }

  const onGoBackFromSecondStep = (password: string) => {
    setDetails((prev) => ({ ...prev, password }))
    setStep(0)
  }

  const steps = [
    <SignUpFormFirstStep
      defaultValues={details}
      onSubmit={onFirstStepSubmit} />,
    <SignUpFormSecondStep
      defaultValues={{
        password: details.password,
        confirmPassword: details.password,
      }}
      onGoBack={onGoBackFromSecondStep}
      onSubmit={onSecondStepSubmit}
    />,
  ]

  return (
    <>
      {steps[step]}
    </>
  )
}

export default SignUpScreen