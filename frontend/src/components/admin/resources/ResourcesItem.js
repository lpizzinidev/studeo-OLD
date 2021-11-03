import { useState, useContext } from 'react';

import { ResourcesContext } from '../../../contexts/ResourcesContext';

import { DialogConfirm } from '../../views/DialogConfirm';

import * as utils from '../../../util/util';

import deleteIcon from '../../../assets/icons/delete.svg';

export const ResourcesItem = ({ resource }) => {
  const [showDialogDelete, setShowDialogDelete] = useState(false);

  const { showEditResource, deleteResource } = useContext(ResourcesContext);

  const handleClick = (e) => {
    if (e.target.className === 'icon-button') return;
    showEditResource(resource);
  };

  const requestDeleteResource = () => {
    setShowDialogDelete(true);
  };

  const handleDeleteResource = () => {
    deleteResource(resource._id);
    setShowDialogDelete(false);
  };

  return (
    <>
      <div
        className='card card-item'
        onClick={handleClick}
        data-testid='resources-item'
      >
        <div>
          <div>
            <p className='text-footer'>
              {resource.author !== '' ? resource.author : 'No author'} -{' '}
              {utils.formatDuration(resource.duration)}
            </p>
            <p className='text-body-1'>{resource.name}</p>
          </div>
          <img
            src={deleteIcon}
            alt='Delete resource'
            className='icon-button'
            onClick={requestDeleteResource}
          />
        </div>
      </div>
      <DialogConfirm
        title='Delete resource'
        message='Are you sure you want to delete the resource?'
        confirmAction={handleDeleteResource}
        show={showDialogDelete}
        setShow={setShowDialogDelete}
      />
    </>
  );
};
