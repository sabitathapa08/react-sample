import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProjectId } from '../../constants';
import {
  getMetricsRequest,
  getFormRequest,
  getFormQuestionsRequest,
  getReportDataRequest,
  addReportRequest,
} from '../../actions/report';
import {
  makeSelectReportList,
  makeSelectMetrics,
  makeSelectForms,
  makeSelectFormQuestions,
  makeSelectPostReportSuccess,
} from '../../selectors/report';
import { successToast } from '../../utils/toastHandler';
import Nav from './Nav';
import FormHeader from './FormHeader';
import BasicData from './BasicData';
import Metrics from './Metrics';
import SelectedColumn from './SelectedColumn';
import DeleteModal from '../../components/DeleteModal';
import Button from './Button';
const InitialState = {
  data: {
    reportName: '',
    desc: '',
    selectedReportType: '',
    selectedMetrics: [],
  },
  formInfo: {
    selectedFormType: '',
    selectedForm: '',
    selectedIndividualForm: [],
    selectedQuestions: [],
    formValue: [],
    selectedFormValue: [],
  },
  siteInfo: {
    selectedMetas: [],
    siteValues: [],
    selectedValue: [
      {
        category: 'site_information',
        code: 'actual',
        types: [0],
        label: 'Actual',
      },
    ],
  },
  reportType: [],
  metrics: [],
  metricArr: [],
  siteInfoArr: [],
  formInfoArr: [],
  formTypeArr: [],
  filterArr: [],
  usersArr: [],
  individualFormArr: [],
  toggleSelectClass: {
    reportType: false,
    siteType: false,
    siteValue: false,
    formType: false,
    formValue: false,
    formQuestSelect: false,
    submissionCount: false,
    filterRegion: false,
    filterSiteType: false,
    filterUserRole: false,
  },
  collapseClass: false,
  submissionType: {},
  submissions: [],
  userList: [],
  metaAttributes: [],
  formQuestions: [],
  filter: {
    filterByRegions: [{ id: 'all_regions', name: 'Select All' }],
    filterBySiteType: [{ id: 'all_sitetypes', name: 'Select All' }],
    filterBy: {},
    filterByUserRoles: [{ id: 'all_userroles', name: 'Select All' }],
  },
  isDelete: false,
  errors: {},
  breadcrumb: {},
};

const mapStateToProps = createStructuredSelector({
  reportList: makeSelectReportList(),
  metrics: makeSelectMetrics(),
  forms: makeSelectForms(),
  formQuestions: makeSelectFormQuestions(),
  postReportSuccess: makeSelectPostReportSuccess(),
});

const mapDispatchToProps = dispatch => ({
  getReportData: payload => dispatch(getReportDataRequest(payload)),
  getMetrics: payload => dispatch(getMetricsRequest(payload)),
  getForms: payload => dispatch(getFormRequest(payload)),
  getFormQuestions: payload =>
    dispatch(getFormQuestionsRequest(payload)),
  addReports: (projectId, body) =>
    dispatch(addReportRequest(projectId, body)),
});

class AddNewReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...InitialState,
      applyFilter: false,
      reportId: '',
      projectId: '',
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { reportId },
      },
    } = this.props;

    this.setState({ projectId: ProjectId }, () => {
      if (reportId) {
        this.setState({ reportId }),
          this.props.getReportDataRequest({ payload: reportId });
      }
      this.props.getMetrics({ payload: id });
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.reports.reportTypes !== this.props.reports.reportTypes
    ) {
      const types = this.props.reports.reportTypes;
      const typeArr = types.filter(t => t.id === 0 || t.id > 3);
      this.setState({
        reportType: typeArr,
      });
    }
    if (prevProps.reports.metrics !== this.props.reports.metrics) {
      this.setState({ metrics: this.props.reports.metrics }, () => {
        if (this.state.metrics.length > 0) {
          this.setArrays();
        }
      });
    }
    if (
      prevProps.reports.metaAttributes !==
      this.props.reports.metaAttributes
    ) {
      this.setState({
        metaAttributes: this.props.reports.metaAttributes,
      });
    }
    if (prevProps.reports.regions !== this.props.reports.regions) {
      this.setState(state => ({
        filter: {
          ...state.filter,
          filterByRegions: [
            ...state.filter.filterByRegions,
            ...this.props.reports.regions,
          ],
        },
      }));
    }
    if (
      prevProps.reports.siteTypes !== this.props.reports.siteTypes
    ) {
      this.setState(state => ({
        filter: {
          ...state.filter,
          filterBySiteType: [
            ...state.filter.filterBySiteType,
            ...this.props.reports.siteTypes,
          ],
        },
      }));
    }
    if (
      prevProps.reports.userRoles !== this.props.reports.userRoles
    ) {
      this.setState(state => ({
        filter: {
          ...state.filter,
          filterByUserRoles: [
            ...state.filter.filterByUserRoles,
            ...this.props.reports.userRoles,
          ],
        },
      }));
    }
    if (
      prevProps.reports.actionResponse !==
      this.props.reports.actionResponse
    ) {
      const msg = this.props.reports.actionResponse.detail;
      successToast(msg);
    }
  }

  componentWillUnmount() {
    this.clearState();
  }

  clearState() {
    this.setState({ ...InitialState });
  }

  handleToggleClass = toggleFor => {
    this.setState(state => ({
      toggleSelectClass: {
        ...state.toggleSelectClass,
        [toggleFor]: !state.toggleSelectClass[toggleFor],
      },
    }));
  };

  handleSiteAddValue = data => {
    const { selectedMetas, selectedValue } = data;
    this.setState(
      state => ({
        siteInfo: {
          ...state.siteInfo,
          selectedMetas,
          selectedValue,
        },
      }),
      () => {
        this.handleAddValue();
      },
    );
  };

  handleAddValue = () => {
    const {
      siteInfo: { selectedMetas, selectedValue },
      data: { selectedMetrics },
    } = this.state;
    const newArr = [];
    let filteredMetrics = [];

    this.setState(state => {
      if (
        selectedMetas.length > 0 &&
        selectedValue &&
        selectedValue.length > 0
      ) {
        selectedMetas.map(meta => {
          return selectedValue.map(value => {
            return newArr.push({ ...meta, value });
          });
        });
        filteredMetrics = selectedMetrics.filter(i => {
          if (!i.value) {
            return true;
          }
          if (i.value && i.value.selectedForm) {
            return true;
          }
          return false;
        });

        const arr = [...filteredMetrics, ...newArr];
        return {
          data: {
            ...state.data,
            selectedMetrics: arr,
          },
        };
      }

      if (selectedValue && selectedValue.length === 0) {
        filteredMetrics = selectedMetrics.filter(i => {
          if (!i.value) {
            return true;
          }
          if (i.value && i.value.selectedForm) {
            return true;
          }
          return false;
        });
        return {
          data: {
            ...state.data,
            selectedMetrics: filteredMetrics,
          },
        };
      }
      if (selectedMetas && selectedMetas.length === 0) {
        filteredMetrics = selectedMetrics.filter(i => {
          if (!i.value) {
            return true;
          }
          if (i.value && i.value.selectedForm) {
            return true;
          }
          return false;
        });
        return {
          data: {
            ...state.data,
            selectedMetrics: filteredMetrics,
          },
        };
      }
      return null;
    });
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState(
      state => ({
        data: {
          ...state.data,
          [name]: value,
        },
      }),
      () => {
        const { errors } = this.state;
        this.setState(state => {
          if (name === 'reportName' && errors[name])
            return { errors: { ...state.errors, reportName: '' } };
          if (name === 'desc' && errors[name])
            return { errors: { ...state.errors, desc: '' } };
          return null;
        });
      },
    );
  };

  handleToggleCollapse = () => {
    this.setState(({ collapseClass }) => ({
      collapseClass: !collapseClass,
    }));
  };

  handleChecKUser = (e, user) => {
    const {
      target: { name, checked },
    } = e;

    this.setState(state => {
      if (checked) {
        const newList = state.data.selectedMetrics.filter(
          i => i.code !== name,
        );
        return {
          userList: [...state.userList, user],
          data: {
            ...state.data,
            selectedMetrics: [...newList, user],
          },
        };
      }
      if (!checked) {
        const newList = state.data.selectedMetrics.filter(
          i => i.code !== name,
        );

        const filteredUser = state.userList.filter(
          u => u.code !== name,
        );
        return {
          userList: filteredUser,
          data: {
            ...state.data,
            selectedMetrics: newList,
          },
        };
      }
      return null;
    });
  };

  handleReportTypeChange = e => {
    const { value } = e.target;

    this.setState(
      state => ({
        data: {
          ...state.data,
          selectedReportType: JSON.parse(value),
          selectedMetrics: [],
        },
        collapseClass: true,
      }),
      () => {
        this.setArrays();
      },
    );
  };

  setArrays = () => {
    const {
      metrics,
      data: { selectedReportType },
    } = this.state;
    const metricsArr = metrics.filter(metric =>
      metric.types.includes(selectedReportType),
    );
    if (metricsArr.length > 0) {
      this.setState(
        {
          metricArr: metricsArr.filter(
            item => item.category === 'default',
          ),
          siteInfoArr: metricsArr.filter(
            item => item.category === 'site_information',
          ),
          formInfoArr: metricsArr.filter(
            item => item.category === 'form_information',
          ),
          usersArr: metricsArr.filter(
            item => item.category === 'users',
          ),
          individualFormArr: metricsArr.filter(
            item => item.category === 'individual_form',
          ),
          filterArr: metricsArr.filter(
            item => item.category === 'filter',
          ),
        },
        () => {
          const {
            siteInfoArr,
            siteInfo: { selectedMetas },
          } = this.state;

          if (siteInfoArr.length > 0 && selectedMetas.length > 0) {
            this.setSiteValue();
          }
        },
      );
    }
  };

  handleSubmissionType = type => {
    this.setState({ submissionType: type });
  };

  handleCheckSubmissionType = e => {
    const {
      target: { name, checked },
    } = e;

    const { submissionType, data, submissions } = this.state;
    this.setState(state => {
      if (checked) {
        const newList = data.selectedMetrics.filter(
          i => i.code !== name,
        );
        return {
          submissions: [...state.submissions, submissionType],
          data: {
            ...state.data,
            selectedMetrics: [...newList, submissionType],
          },
        };
      }
      if (!checked) {
        const newList = data.selectedMetrics.filter(
          i => i.code !== name,
        );
        const filterSubmission = submissions.filter(
          type => type.code !== name,
        );
        return {
          submissions: filterSubmission,
          data: {
            ...state.data,
            selectedMetrics: newList,
          },
        };
      }
      return null;
    });
  };

  handleChangeArray = item => {
    const {
      formInfo: { selectedIndividualForm },
    } = this.state;
    this.setState(state => {
      const list = state.data.selectedMetrics;
      const filteredArr = list.filter(metric => {
        if (
          metric.code &&
          metric.value &&
          metric.value.selectedForm
        ) {
          if (metric.code === item.code) {
            if (
              metric.value.selectedIndividualForm &&
              item.value.selectedIndividualForm
            ) {
              if (
                metric.value.selectedIndividualForm.code !==
                item.value.selectedIndividualForm.code
              ) {
                return true;
              }
              return false;
            }
            if (
              metric.value.selectedQuestion &&
              item.value.selectedQuestion
            ) {
              if (
                metric.value.selectedQuestion.name ===
                item.value.selectedQuestion.name
              ) {
                if (
                  metric.value.selectedQuestion.form.code !==
                  item.value.selectedQuestion.form.code
                ) {
                  return true;
                }
                return false;
              }
            }
          }
          return true;
        }
        if (
          metric.code &&
          metric.value &&
          !metric.value.selectedForm
        ) {
          if (metric.code === item.code) {
            if (metric.value.code !== item.value.code) {
              return true;
            }
            return false;
          }
          return true;
        }
        if (metric.code && !metric.value) {
          if (metric.code !== item.code) {
            return true;
          }
          return false;
        }
        return null;
      });

      const metaList = [];
      filteredArr.map(f => {
        if (f.value && !f.value.selectedForm) {
          metaList.push(f.code);
        }
      });
      const filteredSelectedMetas = state.siteInfo.selectedMetas.filter(
        m => metaList.includes(m.code),
      );

      const filteredUserArr = state.userList.filter(
        u => u.code !== item.code,
      );

      const filteredSubmissionArr = state.submissions.filter(
        s => s.code !== item.code,
      );

      const filteredIndividualForm = selectedIndividualForm.map(
        ind => {
          const { type, form, metrics } = ind;
          if (item.code === type) {
            if (item.value.selectedForm.id === form) {
              const newItem = {
                type,
                form,
                metrics: metrics.filter(
                  m =>
                    m.code !== item.value.selectedIndividualForm.code,
                ),
              };
              return newItem;
            } else {
              return ind;
            }
          } else {
            return ind;
          }
        },
      );

      return {
        data: {
          ...state.data,
          selectedMetrics: filteredArr,
        },
        formInfo: {
          ...state.formInfo,
          selectedIndividualForm: filteredIndividualForm,
        },
        userList: filteredUserArr,
        submissions: filteredSubmissionArr,
        siteInfo: {
          ...state.siteInfo,
          selectedMetas: filteredSelectedMetas,
          siteValues:
            filteredSelectedMetas.length > 0
              ? this.state.siteInfo.siteValues
              : [],
        },
      };
    });
  };

  setSiteValue = () => {
    this.handleAddValue();
    const {
      siteInfo: { selectedMetas, siteValues },
      siteInfoArr,
    } = this.state;

    const arr = [];
    selectedMetas.map(each => {
      if (
        each.type === 'Number' ||
        each.type === 'FormSubCountQuestion'
      ) {
        arr.push('number');
      } else {
        arr.push('text');
      }
    });
    if (arr.length > 0) {
      this.setState(state => {
        if (arr.includes('text')) {
          const siteTextArr = this.handleTextValueTypes(
            'site',
            siteInfoArr,
            siteValues,
          );
          return {
            siteInfo: {
              ...state.siteInfo,
              siteValues: siteTextArr,
            },
          };
        } else {
          const filteredValues =
            siteInfoArr.length > 0 && siteInfoArr;
          return {
            siteInfo: {
              ...state.siteInfo,
              siteValues: filteredValues,
            },
          };
        }
      });
    } else {
      this.setState({
        siteInfo: { ...this.state.siteInfo, siteValues: [] },
      });
    }
  };

  handleTextValueTypes = (type, toSearchArr, selectedArr) => {
    let filteredValues = [];

    if (type === 'site') {
      const someArr = selectedArr;
      if (toSearchArr.length > 0) {
        toSearchArr.map(info => {
          if (someArr.length > 0) {
            filteredValues = someArr.filter(some => {
              if (
                some.code === 'actual' ||
                some.code === 'most_common' ||
                some.code === 'all_values'
              ) {
                return true;
              } else {
                return false;
              }
            });
          } else {
            if (
              info.code === 'actual' ||
              info.code === 'most_common' ||
              info.code === 'all_values'
            ) {
              filteredValues.push(info);
            }
          }
        });
      }
    }

    return filteredValues;
  };

  handleSelectChange = data => {
    this.setState(state => ({
      data: {
        ...state.data,
        selectedMetrics: data,
      },
    }));
  };

  addSubmissionCount = (
    selectedFormType,
    selectedForm,
    submissionCount,
  ) => {
    const {
      data: { selectedMetrics },
    } = this.state;
    const toshowArr = [];

    this.setState(state => {
      const filterMetrics = selectedMetrics.filter(m => {
        if (m.value && m.value.selectedIndividualForm) {
          if (m.code === selectedFormType.code) {
            if (m.value.selectedForm.id === selectedForm.id) {
              return false;
            }
            if (m.value.selectedForm.id !== selectedForm.id) {
              return true;
            }
          } else {
            return true;
          }
        } else {
          return true;
        }
      });

      return {
        data: {
          ...state.data,
          selectedMetrics: [...filterMetrics, ...toshowArr],
        },
        formInfo: {
          ...state.formInfo,
          selectedIndividualForm: submissionCount,
        },
      };
    });
  };

  handleFormInfo = ({
    selectedFormType,
    selectedForm,
    selectedQuestions,
    selectedFormValue,
  }) => {
    const addArr = selectedFormValue.map(val => {
      const input = {
        ...selectedFormType,
        value: {
          selectedForm,
          selectedQuestion: {
            ...selectedQuestions,
            form: { ...val },
          },
        },
      };
      return input;
    });
    const {
      data: { selectedMetrics },
    } = this.state;

    this.setState(state => {
      const filterMetrics = selectedMetrics.filter(m => {
        if (m.value && m.value.selectedQuestion) {
          if (
            m.code === selectedFormType.code &&
            m.value.selectedForm.id === selectedForm.id
          ) {
            if (
              m.value.selectedQuestion.name === selectedQuestions.name
            ) {
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          }
        } else {
          return true;
        }
      });
      return {
        data: {
          ...state.data,
          selectedMetrics: [...filterMetrics, ...addArr],
        },
        formInfo: {
          ...state.formInfo,
          selectedQuestions,
          selectedFormValue,
        },
      };
    });
  };

  handleSubmitReport = () => {
    const { reportId, data, projectId } = this.state;
    const errors = this.onValidation();
    this.setState({
      errors,
    });
    if (errors && Object.keys(errors).length === 0) {
      const body = {
        type: data.selectedReportType,
        description: data.desc,
        title: data.reportName,
        attributes: JSON.stringify(data.selectedMetrics),
      };

      this.props.addReports(projectId, body);
    }
  };

  onValidation = () => {
    const {
      data: { reportName, desc },
    } = this.state;
    const err = {};
    if (!reportName) err.reportName = 'required';
    if (!desc) err.desc = 'required';
    return err;
  };

  handleSubmitFilter = filter => {
    const {
      reportId,
      data: { selectedReportType, desc, reportName, selectedMetrics },
    } = this.state;
    const {
      regions,
      siteType,
      userRoles,
      startDate,
      endDate,
    } = filter;

    const modifyFilter = {
      regions:
        selectedReportType < 3
          ? regions.filter(r => r.id !== 'all_regions')
          : [],
      site_types:
        selectedReportType < 3
          ? siteType.filter(r => r.id !== 'all_sitetypes')
          : [],
      user_roles:
        selectedReportType === 4
          ? userRoles.filter(u => u.id !== 'all_userroles')
          : [],
      start_date: selectedReportType === 5 ? startDate : '',
      end_date: selectedReportType === 5 ? endDate : '',
    };

    this.setState(
      state => ({
        filter: {
          ...state.filter,
          filterBy: modifyFilter,
        },
      }),
      () => {
        const body = {
          type: selectedReportType,
          description: desc,
          title: reportName,
          attributes: JSON.stringify(selectedMetrics),
          filter: JSON.stringify(modifyFilter),
        };
        this.props.addReports(reportId, body);
      },
    );
  };

  handleToggleDelete = () => {
    this.setState(({ isDelete }) => ({ isDelete: !isDelete }));
  };

  handleCancel = () => {
    this.setState({ isDelete: false });
  };

  handleConfirmDelete = () => {
    const { projectId } = this.state;
    this.props.history.push(`/report-list/${projectId}`);
  };

  render() {
    const {
      state: {
        data: {
          reportName,
          desc,
          selectedReportType,
          selectedMetrics,
        },
        formInfo: {
          selectedFormType,
          selectedForm,
          selectedIndividualForm,
          selectedQuestions,
          formValue,
          selectedFormValue,
        },
        siteInfo: { selectedMetas, siteValues, selectedValue },
        reportType,
        metricArr,
        formInfoArr,
        toggleSelectClass,
        submissionType,
        submissions,
        usersArr,
        userList,
        metaAttributes,
        formTypeArr,
        individualFormArr,
        collapseClass,
        breadcrumb,
        isDelete,
        errors,
      },
      props: {
        onRequest: reportLoader,
        forms,
        formTypes,
        formQuestions,
        match: {
          params: { id: projectId, reportId },
        },
      },
    } = this;
    const isEdit = reportId ? true : false;

    return (
      <>
        <Nav
          breadcrumb={breadcrumb}
          isEdit={isEdit}
          reportName={reportName}
        />
        <div className="reports mrb-30">
          <div className="card">
            <div className="card-body">
              <div className="report-generator">
                <FormHeader
                  isEdit={isEdit}
                  handleToggleDelete={this.handleToggleDelete}
                />
                <BasicData
                  handleChange={this.handleChange}
                  reportName={reportName}
                  desc={desc}
                  errors={errors}
                  reportType={reportType}
                  selectedReportType={selectedReportType}
                  handleReportTypeChange={this.handleReportTypeChange}
                  isEdit={isEdit}
                  handleToggleCollapse={this.handleToggleCollapse}
                  collapseClass={collapseClass}
                  reportLoader={reportLoader}
                />
                {collapseClass && (
                  <>
                    <div className="report-accordion">
                      <div className="row ">
                        <Metrics
                          projectId={projectId}
                          selectedReportType={selectedReportType}
                          handleToggleClass={this.handleToggleClass}
                          toggleSelectClass={toggleSelectClass}
                          data={metricArr}
                          users={usersArr}
                          userList={userList}
                          siteValues={siteValues}
                          selectedValue={selectedValue}
                          metaAttributes={metaAttributes}
                          selectedMetas={selectedMetas}
                          submissionType={submissionType}
                          submissions={submissions}
                          handleSubmissionType={
                            this.handleSubmissionType
                          }
                          handleCheckSubmissionType={
                            this.handleCheckSubmissionType
                          }
                          handleCheckUser={this.handleChecKUser}
                          selectedMetrics={selectedMetrics}
                          formInfoArr={formInfoArr}
                          formTypes={formTypes}
                          selectedFormType={selectedFormType}
                          formTypeArr={formTypeArr}
                          selectedForm={selectedForm}
                          formQuestions={formQuestions}
                          forms={forms}
                          individualFormArr={individualFormArr}
                          selectedIndividualForm={
                            selectedIndividualForm
                          }
                          selectedQuestions={selectedQuestions}
                          formValue={formValue}
                          selectedFormValue={selectedFormValue}
                          addSubmissionCount={this.addSubmissionCount}
                          handleFormInfo={this.handleFormInfo}
                          handleSiteAddValue={this.handleSiteAddValue}
                        />
                        <SelectedColumn
                          selected={selectedMetrics}
                          handleSelectChange={this.handleSelectChange}
                          handleCheckSubmissionType={
                            this.handleChangeArray
                          }
                          selectedReportType={selectedReportType}
                        />
                        <Button
                          handleToggleDelete={this.handleToggleDelete}
                          selectedMetrics={selectedMetrics}
                          handleSubmitReport={this.handleSubmitReport}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              {isDelete && (
                <DeleteModal
                  onConfirm={this.handleConfirmDelete}
                  onCancel={this.handleCancel}
                  onToggle={this.handleToggleDelete}
                  message="Are you sure you want to cancel? All entered data will be lost!"
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddNewReport);
