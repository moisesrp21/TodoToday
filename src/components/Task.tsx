import SavedTask from './SavedTask';
import React from 'react';
import EditingTask from './EditingTask';
type Props = {
    id: number;
    title: string;
    created: string;
    completed: boolean;
};
const Task = ({ id, title, created, completed }: Props) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };
    return isEditing ? (
        <EditingTask id={id} value={title} toggleEditing={toggleEditing} />
    ) : (
        <SavedTask
            id={id}
            title={title}
            created={created}
            completed={completed}
            toggleEditing={toggleEditing}
        />
    );
};

export default Task;
