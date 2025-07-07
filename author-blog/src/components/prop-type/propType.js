import PropTypes from 'prop-types';
import { ROLEIDS } from '../../constants/roleId';

export const TYPE = {
  error: PropTypes.oneOf([PropTypes.string, PropTypes.exact(null)]),
  comments: PropTypes.arrayOf({
    authorLogin: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
  }),
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  user: PropTypes.shape({
    session: PropTypes.oneOf([PropTypes.string, PropTypes.exact(null)]),
    id: PropTypes.oneOf([PropTypes.string, PropTypes.exact(null)]),
    login: PropTypes.oneOf([PropTypes.string, PropTypes.exact(null)]),
    roleId: PropTypes.oneOf(Object.values(ROLEIDS)),
  }),
};
