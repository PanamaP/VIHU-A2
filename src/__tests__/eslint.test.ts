import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
// @ts-expect-error, ignore used since we are using ruleTester for the import
import camelCaseFunctions from '../../eslint_rules/camelCaseFunctions'
// @ts-expect-error, ignore used since we are using ruleTester for the import
import noMomentLibrary from '../../eslint_rules/noMomentLibrary'
// @ts-expect-error, ignore used since we are using ruleTester for the import
import noConsoleLog from '../../eslint_rules/noConsoleLog'

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser')
})

describe('camelCaseFunctions rule', () => {
  const errors = [
    { message: "Function name 'MyFunction' is not in camel case." }
  ]

  it('Should enforce camelCase naming for function', () => {
    ruleTester.run('camelCaseFunctions', camelCaseFunctions, {
      valid: [{ code: 'function myFunction() {}' }],
      invalid: [
        {
          code: 'function MyFunction() {}',
          output: 'function myFunction() {}',
          errors
        }
      ]
    })
  })

  it('should enforce camelCase naming for arrow functions', () => {
    ruleTester.run('camelCaseFunctions', camelCaseFunctions, {
      valid: [{ code: 'const myFunction = () => {}' }],
      invalid: [
        {
          code: 'const MyFunction = () => {}',
          output: 'const myFunction = () => {}',
          errors
        }
      ]
    })
  })

  it('should enforce camelCase naming for function expressions', () => {
    ruleTester.run('camelCaseFunctions', camelCaseFunctions, {
      valid: [{ code: 'const myFunction = function() {}' }],
      invalid: [
        {
          code: 'const MyFunction = function() {}',
          output: 'const myFunction = function() {}',
          errors
        }
      ]
    })
  })
})

describe('noMomentLibrary rule', () => {
  it('Should enforce noMomentLibrary', () => {
    const errors = [
      {
        message: 'Moment library is deprecated and not allowed to be imported.'
      }
    ]
    ruleTester.run('noMomentLibrary', noMomentLibrary, {
      valid: [{ code: 'import date from "datefns"' }],
      invalid: [
        {
          code: 'import moment from "moment"',
          output: '',
          errors
        }
      ]
    })
  })
})

describe('noConsoleLog rule', () => {
  it('Should enforce no console.log', () => {
    const errors = [{ message: 'console.log() is not allowed in production' }]
    ruleTester.run('noConsoleLog', noConsoleLog, {
      valid: [{ code: 'console.error()' }],
      invalid: [
        {
          code: "console.log('what')",
          output: '',
          errors
        }
      ]
    })
  })
})
