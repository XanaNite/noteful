import React from 'react';
import './NotePageNav.css';
import CircleButton from '../CircleButton/CircleButton';
import ApiContext from '../ApiContext';

export default class NotePageNav extends React.Component{
    static defaultProps = {
        history: {
            goBack: () => {},
        }
    };
    static contextType = ApiContext;

    render(){
        return(
            <div className='NotePageNav'>
                <CircleButton 
                    tag='button'
                    role='link' 
                    onClick={() => this.props.history.goBack()}
                    className='NotePageNav__go-back'
                >
                    Go Back
                </CircleButton>
                {this.props.folder && (
                    <h3 className='NotePageNav__folder-name'>
                        {this.propsprops.folder.name}
                    </h3>
                )}
            </div>
        );
    }
}