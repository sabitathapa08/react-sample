import React, { Component } from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CustomSelect from '../../components/CustomSelect';
import CustomRadioButton from '../../components/CustomRadioButton';
import CustomCheckBox from '../../components/CustomCheckbox';
import { getForms, getFormQuestions } from '../../actions/report';
import findQuestion, { groupQuestion } from './FindQuestion';

class FormInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      filteredQuestions: [],
      formInfoArr: [],
      formTypes: [],
      formTypeArr: [],
      selectAll: false,
      individualFormArr: [],
      formInfo: {
        selectedFormType: '',
        selectedForm: '',
        selectedIndividualForm: [],
        selectedQuestions: [],
        selectedFormValue: [],
        formValue: [],
      },
    };
  }

  componentDidMount() {
    const {
      projectId,
      formTypes,
      selectedFormType,
      selectedForm,
    } = this.props;
    if (formTypes) {
      this.setState({
        formTypes: formTypes,
      });
    }
    if (selectedFormType) {
      this.setState(state => ({
        formInfo: {
          ...state.formInfo,
          selectedFormType: selectedFormType,
        },
      }));
    }
    if (selectedForm) {
      this.setState(
        state => ({
          formInfo: {
            ...state.formInfo,
            selectedForm: selectedForm,
          },
        }),
        () => {
          const {
            selectedForm: { id },
          } = this.state.formInfo;
          if (id) {
            this.props.getFormQuestions(projectId, id);
          }
        },
      );
    }
  }

  componentDidUpdate(prevProps) {
    const {
      formQuestions,
      formInfoArr,
      formTypes,
      individualFormArr,
      forms,
      selectedIndividualForm,
      selectedFormType,
      selectedForm,
    } = this.props;
    if (prevProps.formQuestions !== formQuestions) {
      let filteredQuestions = [];
      if (formQuestions.length > 0) {
        const groupQuestions = groupQuestion(
          formQuestions[0].json.children,
        );
        filteredQuestions = findQuestion(groupQuestions);
      }
      this.setState({
        filteredQuestions,
      });
    }
    if (prevProps.formInfoArr !== formInfoArr) {
      this.setState({ formInfoArr: formInfoArr });
    }
    if (prevProps.formTypes !== formTypes) {
      this.setState({ formTypes: formTypes });
    }

    if (prevProps.individualFormArr !== individualFormArr) {
      const {
        selectedIndividualForm,
        individualFormArr,
      } = this.props;
      this.setState(state => {
        const selectAll =
          selectedIndividualForm[0] &&
          selectedIndividualForm[0].metrics &&
          individualFormArr.length ===
            selectedIndividualForm[0].metrics.length;
        if (selectedIndividualForm.length > 0) {
          return {
            formInfo: {
              ...state.formInfo,
              selectedIndividualForm: this.props
                .selectedIndividualForm,
            },
            individualFormArr: individualFormArr,
            selectAll,
          };
        }
        return {
          individualFormArr: individualFormArr,
          selectAll,
        };
      });
    }
    if (prevProps.forms !== forms) {
      const formList = forms;
      this.loadForms(formList);
    }

    if (prevProps.selectedIndividualForm !== selectedIndividualForm) {
      this.setState(state => ({
        formInfo: {
          ...state.formInfo,
          selectedIndividualForm: selectedIndividualForm,
        },
      }));
    }
    if (prevProps.selectedFormType !== selectedFormType) {
      this.setState(state => ({
        formInfo: {
          ...state.formInfo,
          selectedFormType: selectedFormType,
        },
      }));
    }
    if (prevProps.selectedForm !== selectedForm) {
      this.setState(state => ({
        formInfo: {
          ...state.formInfo,
          selectedForm: selectedForm,
        },
      }));
    }
  }

  loadForms = formList => {
    const newFormList = [];
    if (formList) {
      formList.map(f => {
        if (f.sub_stages) {
          const { name, sub_stages } = f;
          sub_stages.map(sub => {
            return newFormList.push({ name, ...sub });
          });
        }
        return newFormList.push(f);
      });
    }
    return this.setState({ formTypeArr: newFormList });
  };

  handleRadioChange = e => {
    const { value } = e.target;
    this.setState({ status: JSON.parse(value) });
  };

  findForm = (formType, formId) => {
    const {
      individualFormArr,
      formInfo: { selectedIndividualForm },
    } = this.state;
    const find = selectedIndividualForm.some(
      f =>
        f.type === formType &&
        f.form === formId &&
        individualFormArr.length === f.metrics.length,
    );
    return find;
  };

  handleFormTypeChange = (e, item) => {
    const { projectId } = this.props;
    const {
      formInfo: { selectedForm },
    } = this.state;
    this.setState(
      state => {
        const find = this.findForm(item.code, selectedForm.id);
        if (find) {
          return {
            formInfo: {
              ...state.formInfo,
              selectedFormType: item,
            },
            selectAll: true,
          };
        }
        return {
          formInfo: {
            ...state.formInfo,
            selectedFormType: item,
          },
          selectAll: false,
        };
      },
      () => {
        const {
          selectedFormType: { code },
        } = this.state.formInfo;

        this.props.getForms(projectId, code);
      },
    );
  };

  handleFormSelected = (e, item) => {
    const { projectId } = this.props;
    const {
      formInfo: { selectedFormType },
    } = this.state;
    this.setState(
      state => {
        const find = this.findForm(selectedFormType.code, item.id);
        if (find) {
          return {
            formInfo: {
              ...state.formInfo,
              selectedForm: item,
            },
            selectAll: true,
          };
        }
        return {
          formInfo: {
            ...state.formInfo,
            selectedForm: item,
          },
          selectAll: false,
        };
      },
      () => {
        const {
          selectedForm: { id },
        } = this.state.formInfo;
        this.props.getFormQuestions(projectId, id);
      },
    );
  };

  handleIndividualFormSelected = (e, item) => {
    const {
      target: { name, checked },
    } = e;
    this.setState(
      state => {
        const {
          formInfo: {
            selectedFormType,
            selectedForm,
            selectedIndividualForm,
          },
        } = state;
        if (checked) {
          const sameArr = selectedIndividualForm.filter(
            f =>
              f.type === selectedFormType.code &&
              f.form === selectedForm.id,
          );
          if (sameArr[0]) {
            sameArr[0].metrics.push(item);
          } else {
            sameArr.push({
              type: selectedFormType.code,
              form: selectedForm.id,
              metrics: [{ ...item }],
            });
          }

          const diffForm = selectedIndividualForm.filter(
            f =>
              f.type === selectedFormType.code &&
              f.form !== selectedForm.id,
          );
          const diffType = selectedIndividualForm.filter(
            f => f.type !== selectedFormType.code,
          );
          return {
            formInfo: {
              ...state.formInfo,
              selectedIndividualForm: [
                ...sameArr,
                ...diffForm,
                ...diffType,
              ],
            },
            selectAll: false,
          };
        }
        if (!checked) {
          const filterSubmissionCount = selectedIndividualForm.map(
            count => {
              if (
                count.type === selectedFormType.code &&
                count.form === selectedForm.id
              ) {
                const filter = count.metrics.filter(
                  m => m.code !== name,
                );
                const each = {
                  type: count.type,
                  form: count.form,
                  metrics: [...filter],
                };
                return each;
              }
              return count;
            },
          );

          return {
            formInfo: {
              ...state.formInfo,
              selectedIndividualForm: filterSubmissionCount,
            },
            selectAll: false,
          };
        }
        return null;
      },
      () => {
        const {
          formInfo: {
            selectedFormType,
            selectedForm,
            selectedIndividualForm,
          },
        } = this.state;
        this.props.addSubmissionCount(
          selectedFormType,
          selectedForm,
          selectedIndividualForm,
        );
      },
    );
  };

  handleChangeFormQuest = (e, meta, value) => {
    if (meta && Object.keys(meta).length > 0) {
      this.handleFormQuestionCheck(e, meta);
    }
    if (value && Object.keys(value).length > 0) {
      this.handleFormValueCheck(e, value);
    }
  };

  handleFormQuestionCheck = (e, item) => {
    this.setState(
      state => ({
        formInfo: {
          ...state.formInfo,
          selectedQuestions: item,
        },
      }),
      () => {
        this.setFormValue();
      },
    );
  };

  setFormValue = () => {
    const {
      formInfo: { selectedQuestions, formValue },
      formInfoArr,
    } = this.state;

    this.setState(state => {
      if (selectedQuestions.type === 'integer') {
        const filteredValues = formInfoArr.length > 0 && formInfoArr;
        return {
          formInfo: {
            ...state.formInfo,
            formInfoArr: filteredValues,
          },
        };
      }
      if (selectedQuestions.type !== 'integer') {
        const formTextArr = this.handleTextValueTypes(
          formInfoArr,
          formValue,
        );
        return {
          formInfo: {
            ...state.formInfo,
            formValue: formTextArr,
          },
        };
      }
      return null;
    });
  };

  handleFormValueCheck = (e, item) => {
    const { checked } = e.target;
    const {
      formInfo: { selectedFormValue },
    } = this.state;
    this.setState(state => {
      if (checked) {
        return {
          formInfo: {
            ...state.formInfo,
            selectedFormValue: [
              ...state.formInfo.selectedFormValue,
              item,
            ],
          },
        };
      }
      if (!checked) {
        const newArr = selectedFormValue.filter(
          s => s.code !== item.code,
        );
        return {
          formInfo: {
            ...state.formInfo,
            selectedFormValue: newArr,
          },
        };
      }
      return null;
    });
  };

  handleTextValueTypes = (toSearchArr, selectedArr) => {
    let filteredValues = [];
    const someArr = selectedArr;
    if (toSearchArr.length > 0) {
      toSearchArr.map(info => {
        if (someArr && someArr.length > 0) {
          filteredValues = someArr.filter(some => {
            if (
              some.code === 'form_info_actual' ||
              some.code === 'form_info_most_common' ||
              some.code === 'form_info_all_values'
            ) {
              return true;
            }
            return false;
          });
        } else {
          if (
            info.code === 'form_info_actual' ||
            info.code === 'form_info_most_common' ||
            info.code === 'form_info_all_values'
          ) {
            filteredValues.push(info);
          }
        }
        return filteredValues;
      });
    }

    return filteredValues;
  };

  selectAllSubmissionCount = e => {
    const { checked } = e.target;
    this.setState(
      state => {
        const {
          individualFormArr,
          formInfo: {
            selectedFormType,
            selectedForm,
            selectedIndividualForm,
          },
        } = state;
        if (checked) {
          const filterArr = selectedIndividualForm.filter(i => {
            if (
              i.type === selectedFormType.code &&
              i.form !== selectedForm.id
            ) {
              return true;
            }
            if (i.type !== selectedFormType.code) {
              return true;
            }
            return false;
          });
          return {
            selectAll: true,
            formInfo: {
              ...state.formInfo,
              selectedIndividualForm: [
                ...filterArr,
                {
                  type: selectedFormType.code,
                  form: selectedForm.id,
                  metrics: individualFormArr,
                },
              ],
            },
          };
        }
        if (!checked) {
          const filterArr = selectedIndividualForm.filter(i => {
            if (
              i.type === selectedFormType.code &&
              i.form !== selectedForm.id
            ) {
              return true;
            }
            if (i.type !== selectedFormType.code) {
              return true;
            }
            return false;
          });
          return {
            selectAll: false,
            formInfo: {
              ...state.formInfo,
              selectedIndividualForm: filterArr,
            },
          };
        }
        return null;
      },
      () => {
        const {
          formInfo: {
            selectedFormType,
            selectedForm,
            selectedIndividualForm,
          },
        } = this.state;
        this.props.addSubmissionCount(
          selectedFormType,
          selectedForm,
          selectedIndividualForm,
        );
      },
    );
  };

  handleAddClick = () => {
    const { formInfo } = this.state;
    this.props.handleFormInfo(formInfo);
    this.setState(state => ({
      formInfo: {
        ...state.formInfo,
        selectedQuestions: [],
        selectedFormValue: [],
      },
    }));
  };

  render() {
    const {
      filteredQuestions,
      status,
      formTypes,
      formInfo: {
        selectedFormType,
        selectedForm,
        selectedQuestions,
        formValue,
        selectedFormValue,
        selectedIndividualForm,
      },
      selectAll,
      formTypeArr,
    } = this.state;
    const {
      toggleSelectClass,
      handleToggleClass,
      individualFormArr,
      selectedReportType,
    } = this.props;
    return (
      <div className="acc-item">
        <div className="acc-header">
          <h5>form information</h5>
        </div>
        <div className="acc-body">
          <div className="form-list">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="mb-2">Form Type</label>
                  <CustomSelect
                    name={formTypes.filter(
                      each => each.id === selectedFormType.id,
                    )}
                    options={formTypes}
                    value={selectedFormType.id}
                    handleSelect={this.handleFormTypeChange}
                  />
                </div>
              </div>
              <div className="col-lg-6" />
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="mb-2">Forms</label>
                  <CustomSelect
                    options={formTypeArr}
                    name={formTypeArr.filter(
                      each => each.id === selectedForm.id,
                    )}
                    value={selectedForm.id}
                    handleSelect={this.handleFormSelected}
                    height="180px"
                  />
                </div>
              </div>
              <div className="col-lg-6" />
              {selectedReportType < 3 && (
                <div className="col-lg-12">
                  <div className="form-group inline-form-group">
                    <CustomRadioButton
                      label="Submission"
                      name="status"
                      id={0}
                      changeHandler={this.handleRadioChange}
                      value={0}
                      checked={status === 0}
                    />
                    <CustomRadioButton
                      label="Form Data"
                      name="status"
                      id={1}
                      changeHandler={this.handleRadioChange}
                      value={1}
                      checked={status === 1}
                    />
                  </div>
                </div>
              )}
              {status === 0 && (
                <div className="col-lg-6">
                  <div>
                    <CustomCheckBox
                      id="select_all"
                      label="Select All"
                      name="select_all"
                      checked={selectAll ? true : false}
                      changeHandler={e => {
                        this.selectAllSubmissionCount(e);
                      }}
                    />
                  </div>
                  <div className="acc-item">
                    <div className="acc-body">
                      <div className="fs-row no-gutters">
                        <div className="fs-5 fs-col" />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      position: 'relative',
                      height: `200px `,
                    }}
                  >
                    <PerfectScrollbar>
                      <ul className="role-list">
                        {individualFormArr.length > 0 &&
                          individualFormArr.map(item => {
                            const filterList = selectedIndividualForm.filter(
                              i => {
                                if (
                                  i.type === selectedFormType.code &&
                                  i.form === selectedForm.id
                                ) {
                                  if (
                                    i.metrics.some(
                                      m => m.code === item.code,
                                    )
                                  ) {
                                    return true;
                                  }
                                  return false;
                                }
                                return false;
                              },
                            );
                            const isChecked =
                              filterList && filterList[0]
                                ? true
                                : false;
                            return (
                              <li key={item.code}>
                                <CustomCheckBox
                                  id={item.code}
                                  label={item.label}
                                  name={item.code}
                                  checked={isChecked}
                                  changeHandler={e => {
                                    this.handleIndividualFormSelected(
                                      e,
                                      item,
                                    );
                                  }}
                                />
                              </li>
                            );
                          })}
                      </ul>
                    </PerfectScrollbar>
                  </div>
                </div>
              )}
              {status === 1 && (
                <>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="mb-2">Questions</label>

                      <CustomSelect
                        name={filteredQuestions.filter(
                          each =>
                            each.name === selectedQuestions.name,
                        )}
                        options={filteredQuestions}
                        value={selectedQuestions.name}
                        handleSelect={this.handleChangeFormQuest}
                        height="180px"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="mb-2">Values</label>
                      <div className="common-select">
                        <div
                          className={
                            toggleSelectClass.formValue
                              ? 'select-wrapper select-toggle'
                              : 'select-wrapper'
                          }
                          role="button"
                          tabIndex="0"
                          onClick={() => {
                            handleToggleClass('formValue');
                          }}
                          onKeyDown={() => {
                            handleToggleClass('formValue');
                          }}
                        >
                          <span className="select-item">
                            Form Values
                          </span>
                          <ul>
                            {formValue &&
                              formValue.length > 0 &&
                              formValue.map(option => {
                                const filterList = selectedFormValue.filter(
                                  i => i.code === option.code,
                                );
                                const isChecked =
                                  filterList && filterList[0]
                                    ? true
                                    : false;
                                return (
                                  <li key={`option_${option.code}`}>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id={option.code}
                                        name={option.code}
                                        checked={isChecked}
                                        onChange={e => {
                                          this.handleChangeFormQuest(
                                            e,
                                            {},
                                            option,
                                          );
                                        }}
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor={option.code}
                                        style={{
                                          paddingLeft: '2em',
                                        }}
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <button
                      type="button"
                      className="common-button is-border flex-end"
                      onClick={() => {
                        this.handleAddClick();
                      }}
                    >
                      Add
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  getForms,
  getFormQuestions,
})(FormInformation);
