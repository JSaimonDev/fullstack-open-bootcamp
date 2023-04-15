import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BlogForm from "./BlogForm";


test("BlogForm calls the event handler it received as props with the right details when a new blog is created", async () => {
        const mockHandler = jest.fn();

        render (<BlogForm submitMockHandler={mockHandler} />
        )

        const inputTitle = screen.getByLabelText('Title')
        const inputAuthor = screen.getByLabelText('Author')
        const inputUrl = screen.getByLabelText('Url')

        fireEvent.change(inputTitle, {target: {value: 'Component testing is done with react-testing-library'}})
        fireEvent.change(inputAuthor, {target: {value: 'Myself'}})
        fireEvent.change(inputUrl, {target: {value: 'pacotabaco.com'}})

        const button = screen.getByRole('button', {name: 'create'})
        fireEvent.click(button)

        await waitFor(() => {
        expect(mockHandler).toHaveBeenCalledTimes(1)
        })
        expect(mockHandler).toHaveBeenCalledWith({title: 'Component testing is done with react-testing-library', author: 'Myself', url: 'pacotabaco.com'})
})