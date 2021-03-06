import React, { Component } from "react";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

const DragHandle = sortableHandle(({ item, label, onChangeHandler }) => (
  <li>
    <div>
      <span className="drag-icon">
        <i className="material-icons">drag_indicator</i>
      </span>
      {!item.value && <label>{label}</label>}
      {!!item.value && item.value.label && (
        <label>{`${label} (${item.value.label})`}</label>
      )}
      {!!item.value &&
        item.value.selectedIndividualForm &&
        item.value.selectedForm.title && (
          <label>{`${label}-${item.value.selectedForm.title} (${item.value.selectedIndividualForm.label})`}</label>
        )}

      <span>
        <a
          className="rejected td-edit-btn td-btn"
          onClick={() => {
            onChangeHandler(item);
          }}
          tabIndex="0"
          role="button"
          onKeyDown={() => {
            onChangeHandler(item);
          }}
        >
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <i className="material-icons">cancel</i>
          </OverlayTrigger>
        </a>
      </span>
    </div>
  </li>
));

const SortableItem = sortableElement(({ item, label, onChangeHandler }) => (
  <DragHandle label={label} onChangeHandler={onChangeHandler} item={item} />
));

const SortableContainer = sortableContainer(
  ({ selectedReportType, children }) => {
    return (
      <div
        style={{
          position: "relative",
          height: `${selectedReportType < 3 ? "1010px" : "680px"} `
        }}
      >
        <PerfectScrollbar>
          <ul className="selected-list">{children}</ul>
        </PerfectScrollbar>
      </div>
    );
  }
);

export default class SelectedColumn extends Component {
  constructor(params) {
    super(params);
    this.state = {
      data: params.selected
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      const selectedList = this.props.selected;
      this.setNewArr(selectedList);
    }
  }

  setNewArr = selectedList => {
    this.setState({
      data: selectedList
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { handleSelectChange } = this.props;
    this.setState(
      ({ data }) => ({
        data: arrayMove(data, oldIndex, newIndex)
      }),
      () => {
        handleSelectChange(this.state.data);
      }
    );
  };

  render() {
    const { data } = this.state;

    const { handleCheckSubmissionType, selectedReportType } = this.props;
    return (
      <div className="col-lg-5 col-md-5">
        <div className="selected-column">
          <h6>
            Selected Columns
            {data.length > 0 && <span>{`(${data.length})`}</span>}
          </h6>
          <SortableContainer
            onSortEnd={this.onSortEnd}
            selectedReportType={selectedReportType}
            useDragHandle
          >
            {data &&
              data.length > 0 &&
              data.map((each, index) => {
                return (
                  <SortableItem
                    key={`item_${each.code}_${index}`}
                    index={index}
                    label={each.label}
                    item={each}
                    onChangeHandler={handleCheckSubmissionType}
                  />
                );
              })}
          </SortableContainer>
        </div>
      </div>
    );
  }
}
