import { type KeyboardEvent, type ChangeEvent, useState } from "react"
import Button  from "@mui/material/Button"

type Props = {
    createItem: (title: string) => void
}

export const CreateItemForm = ({ createItem }: Props) => {
    const [error, setError] = useState<string | null>(null)
    const [itemTitle, setItemTitle] = useState('')

    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()

        if (trimmedTitle !== '') {
            createItem(trimmedTitle)
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''}
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onKeyDown={createItemOnEnterHandler} />
            <Button variant="contained" onClick={createItemHandler}>+</Button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}