import React from 'react';
import Textarea from 'react-textarea-autosize';
import keyboard from '../../../../utils/keyboard';
import './message-editor.less';
import { connect } from 'dva';


class MessageEditor extends React.Component {
    constructor(props){
        super();
        this.state={
            text:'',
        };
    }
    submitContent = () => {
        console.log('MessageEditor.submitContent=' + this.state.text);
        this.setState({text:''});
        this.props.dispatch({
                type:'im/sendMessage',
                payload:{
                    text: this.state.text
                }
            });
        // var displayType, text;
        // if (!(this.state.text.trim().length > 0)) {
        //   return;
        // }
        // if (this.state.text.length > 1000) {
        //   return notifyActions.warn(lang.getText('too-long-text-submit'));
        // } else if (query.deviceByOffline(recorder.getState())) {
        //   return notifyActions.warn(lang.getText('send-later'));
        // } else {
        //   this.clearInputText();
        //   displayType = this.state.activeMarkdown ? 'markdown' : 'text';
        //   text = DSL.write(this.getDslText(this.state.text));
        //   return this.props.onSubmit(text, displayType);
        // }
    }
    onChange = (event) => {
        var examineText, newState, result, selectionEnd, selectionStart, text, trigger;
        text = event.target.value;
        // selectionStart = this.refs.textarea.selectionStart;
        // selectionEnd = this.refs.textarea.selectionEnd;
        // newState = {
        //   text: text,
        //   showMentionMenu: false,
        //   showEmojiMenu: false,
        //   showTopicMenu: false,
        //   showCommandMenu: false,
        //   start: selectionStart,
        //   end: selectionEnd
        // };
        // examineText = text.slice(0, selectionStart);
        // trigger = textareaUtil.getTrigger(examineText, this.getSpecials());
        // if (trigger === '@') {
        //   result = this.filterMembers(textareaUtil.getQuery(examineText, '@'));
        //   newState.suggestMembers = result.suggestMembers;
        //   newState.suggestContacts = result.suggestContacts;
        //   newState.showMentionMenu = result.showMentionMenu;
        // } else if (trigger === ':') {
        //   result = this.filterEmojis(textareaUtil.getQuery(examineText, ':'));
        //   newState.suggestEmojis = result.suggestEmojis;
        //   newState.showEmojiMenu = result.showEmojiMenu;
        // } else if (trigger === '#') {
        //   result = this.filterTopics(textareaUtil.getQuery(examineText, '#'));
        //   newState.suggestTopics = result.suggestTopics;
        //   newState.showTopicMenu = result.showTopicMenu;
        // } else if (trigger === '/' && text[0] === '/') {
        //   result = this.filterCommands(textareaUtil.getQuery(examineText, '/'));
        //   newState.suggestCommands = result.suggestCommands;
        //   newState.showCommandMenu = result.showCommandMenu;
        // }
        this.setState({text:text});
        // return this.debounceSaveDraft(this.props._teamId, this.props._channelId, text);
    }

    onKeyDown = (event) => {
        var ctrlEnter, enter, pressedCtrl, pressedShift, ref1, shiftEnter;
        // if (this.state.showMentionMenu || this.state.showEmojiMenu || this.state.showTopicMenu || this.state.showCommandMenu) {
        //   if ((ref1 = event.keyCode) === keyboard.enter || ref1 === keyboard.up || ref1 === keyboard.down || ref1 === keyboard.tab) {
        //     event.preventDefault();
        //     return;
        //   }
        // }
        if (event.keyCode === keyboard.enter) {
          pressedCtrl = event.ctrlKey || event.metaKey;
          pressedShift = event.shiftKey;
        //   ctrlEnter = this.state.enterMethod === 'ctrlEnter' && pressedCtrl;
        //   shiftEnter = this.state.enterMethod === 'shiftEnter' && pressedShift;
        //   enter = this.state.enterMethod === 'enter' && !pressedCtrl && !pressedShift;
            ctrlEnter = pressedCtrl;
            shiftEnter = pressedShift;
            enter = !pressedCtrl && !pressedShift;
            if (ctrlEnter || shiftEnter || enter) {
                event.preventDefault();
                return this.submitContent();
            }
        }
    }
    renderTextarea =()=>{
        return React.createElement(
            Textarea,
            {
                className: 'lite-textbox',
                minRows: 1,
                maxRows: 5,
                value: this.state.text,
                onChange: this.onChange,
                onClick: this.onChange,
                onKeyUp: this.onChange,
                onKeyDown: this.onKeyDown
            }
        )
    }
    render () {
        return React.createElement(
            'div',
            {
                className: 'message-editor flex-static'

            },
            this.renderTextarea()
        )
    }
}

function mapStateToProps(state) {
    const { _targetId } = state.im;
    return  { _targetId };
}

export default connect(mapStateToProps)(MessageEditor);

//export default MessageEditor;