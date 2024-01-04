import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppsDeleteIcon from '@crema/components/AppsDeleteIcon';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Dropdown } from 'antd';
import { MdLabelOutline } from 'react-icons/md';
import AppIconButton from '@crema/components/AppIconButton';
import { StyledTodoHeaderCheckedAction } from '../index.styled';
import { putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { useInfoViewActionsContext } from '@crema/context/InfoViewContextProvider';

const CheckedTasksActions = ({
  checkedTasks,
  setCheckedTasks,
  onUpdateTasks,
  setData,
  page,
}) => {
  const { asPath } = useRouter();
  const path = asPath.split('/');
  const infoViewActionsContext = useInfoViewActionsContext();

  const [{ apiData: labelList }] = useGetDataApi('/api/todo/labels/list', []);

  const onDeleteTasks = () => {
    putDataApi('/api/todo/update/folder', infoViewActionsContext, {
      taskIds: checkedTasks,
      type: path[path.length - 2],
      name: path[path.length - 1],
      page,
    })
      .then((data) => {
        setData(data);
        infoViewActionsContext.showMessage('Task Deleted Successfully');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });

    setCheckedTasks([]);
  };

  const onSelectLabel = (key) => {
    putDataApi('/api/todo/update/label', infoViewActionsContext, {
      taskIds: checkedTasks,
      type: +key,
    })
      .then((data) => {
        onUpdateTasks(data);
        infoViewActionsContext.showMessage('Task Updated Successfully');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    setCheckedTasks([]);
  };

  const menuLabel = labelList.map((label, index) => {
    return {
      key: index,
      label: <span onClick={() => onSelectLabel(label.id)}> {label.name}</span>,
    };
  });

  return (
    <StyledTodoHeaderCheckedAction>
      <AppsDeleteIcon
        deleteAction={onDeleteTasks}
        deleteTitle={<IntlMessages id="todo.deleteMessage" />}
      />

      <Dropdown menu={{ items: menuLabel }} trigger={['click']}>
        <AppIconButton
          title={<IntlMessages id="common.label" />}
          icon={<MdLabelOutline />}
        />
      </Dropdown>
    </StyledTodoHeaderCheckedAction>
  );
};

export default CheckedTasksActions;

CheckedTasksActions.propTypes = {
  checkedTasks: PropTypes.array.isRequired,
  setCheckedTasks: PropTypes.func,
  onUpdateTasks: PropTypes.func,
  setData: PropTypes.func,
  page: PropTypes.number.isRequired,
};
