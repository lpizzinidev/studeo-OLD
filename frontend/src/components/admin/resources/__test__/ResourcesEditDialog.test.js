import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AuthProvider } from '../../../../contexts/AuthContext';
import { ResourcesContext } from '../../../../contexts/ResourcesContext';

import { ResourcesEditDialog } from '../ResourcesEditDialog';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    _id: '6165a4c343a9660020b1bf1d',
  }),
}));

const testResource = {
  name: 'Example resource name',
  author: 'Example resource author',
  duration: 12345,
  link: 'https://www.test.com',
};

const MockResourcesEditDialog = (props) => {
  return (
    <AuthProvider>
      <ResourcesContext.Provider
        value={{
          editingResource: props.editingResource,
        }}
      >
        <ResourcesEditDialog {...props} />
      </ResourcesContext.Provider>
    </AuthProvider>
  );
};

describe('ResourceEditDialog', () => {
  it('should display `New resource` if no parameters are passed', () => {
    render(<MockResourcesEditDialog />);

    expect(screen.getByText('New resource')).toBeVisible();
  });

  it('should display `Edit resource` if editing resource is passed', () => {
    render(<MockResourcesEditDialog editingResource={testResource} />);

    expect(screen.getByText('Edit resource')).toBeVisible();
  });

  it('should display correct values in editing fields', () => {
    render(<MockResourcesEditDialog editingResource={testResource} />);

    expect(screen.getByDisplayValue(testResource.name)).toBeVisible();
    expect(screen.getByDisplayValue(testResource.author)).toBeVisible();
    expect(screen.getByDisplayValue(testResource.duration)).toBeVisible();
    expect(screen.getByDisplayValue(testResource.link)).toBeVisible();
  });
});
