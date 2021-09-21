import { Link } from 'react-router-dom';

export const ResourcesItem = ({ _id, name, category }) => {
  return (
    <Link to={`/resources/${category}/${_id}`}>
      <div className='card card-item'>
        <div>
          <p className='text-body-1'>{name}</p>
        </div>
      </div>
    </Link>
  );
};
