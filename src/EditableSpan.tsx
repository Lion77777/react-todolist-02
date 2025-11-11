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
                <input value={title} autoFocus onChange={changeTitle} onBlur={turnOffEditMode} />
            ) : (
                <span onDoubleClick={turnOnEditMode}>{itemTitle}</span>
            )}
        </>
    )
}