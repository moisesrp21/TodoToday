import SavedTask from './SavedTask';
import React from 'react';
import EditingTask from './EditingTask';

type Props = {
    id: number;
    title: string;
    created: string;
    completed: boolean;
    tocomplete: number;
    setToComplete: (n: number) => void;
};
const Task = ({
    id,
    title,
    created,
    completed,
    tocomplete,
    setToComplete,
}: Props) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };
    return isEditing ? (
        <EditingTask
            id={id}
            value={title}
            toggleEditing={toggleEditing}
            tocomplete={tocomplete}
            setToComplete={setToComplete}
        />
    ) : (
        <SavedTask
            id={id}
            title={title}
            created={created}
            completed={completed}
            toggleEditing={toggleEditing}
            tocomplete={tocomplete}
            setToComplete={setToComplete}
        />
    );
};

export default Task;
