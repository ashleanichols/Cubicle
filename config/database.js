import { dbUrl } from './config';
import { connect } from 'mongoose';

export default () => {
    return connect(dbUrl, { useNewUrlParser: true });
};