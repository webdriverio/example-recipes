import { expect, $ } from '@wdio/globals'
import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import { render, screen } from '@testing-library/svelte'
import '@testing-library/jest-dom'

import Component from './components/Component.svelte'

describe('Svelte Component Testing', () => {
    it('shows proper heading when rendered using Testing Library primitives', () => {
        render(Component, { name: 'World' })
        const heading = screen.getByText('Hello World!')
        expect(heading).toBeInTheDocument()
    })

    it('changes button text on click', async () => {
        render(Component, { name: 'World' })
        const button = await $('button')
        await button.click()
        await expect(button).toHaveText('Button Clicked')
    })
})