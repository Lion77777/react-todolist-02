import TextField from "@mui/material/TextField"
import { ChangeEvent, useState } from "react"

type Props = {
    itemTitle: string
    onChange: (title: string) => void
}

export const EditableSpan = ({ itemTitle, onChange }: Props) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [title, setTitle] = useState(itemTitle)

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    const turnOffEditMode = () => {
        setIsEditMode(false)
        onChange(title)
    }

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <>
            {isEditMode ? (
                <TextField variant="outlined"
                            value={title}
                            size="small"
                            onChange={changeTitle}
                            onBlur={turnOffEditMode}
                            autoFocus
                />
            ) : (
                <span onDoubleClick={turnOnEditMode}>{itemTitle}</span>
            )}
        </>
    )
}