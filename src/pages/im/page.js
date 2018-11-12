import InboxTable from './inbox/inbox-table';
import ChannelHead from './channel/channel-head';
import ChannelBody from './channel/channel-body';
import './im.less';

export default () => {
    return (
        <div className = 'im-page flex-horiz flex-space'>
            <div className = 'im-aside flex-vert'>
                <InboxTable/>
            </div>
            <div className = 'im-main flex-space flex-vert'>
                <ChannelHead/>
                <ChannelBody/>
            </div>
        </div>
    )
}
