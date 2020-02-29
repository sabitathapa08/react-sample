import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import format from 'date-fns/format';
import { Dropdown } from 'react-bootstrap';
import Loader from '../../components/Loader';
import { getReportDataRequest } from '../../actions/report';
import {
  makeSelectReportsLoad,
  makeSelectErrorResponse,
  makeSelectReportList,
} from '../../selectors/report';
import GetType from '../../components/GetType';
import { DataCrude } from '../../constants';
import { errorToast } from '../../utils/toastHandler';

const mapStateToProps = createStructuredSelector({
  reportList: makeSelectReportList(),
  reportLoader: makeSelectReportsLoad(),
  errorResponse: makeSelectErrorResponse(),
});

const mapDispatchToProps = dispatch => ({
  getReportData: payload => dispatch(getReportDataRequest(payload)),
});

class MyReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportList: [],
      openShare: false,
      Shareid: '',
      deleteId: '',
      openDelete: false,
    };
  }

  componentDidMount() {
    const { id } = this.props;
    const payload = { id, type: 'my_reports' };
    this.props.getReportData(payload);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reportList !== this.props.reportList) {
      this.setList(this.props.reportList);
    }

    if (this.props.errorResponse) {
      errorToast('Opps! Something went wrong.');
    }
  }

  setList = reports => {
    this.setState({
      reportList: reports,
    });
  };

  render() {
    const {
      state: { reportList },
      props: { reportLoader },
    } = this;

    return (
      <div className="card-body">
        {reportLoader && <Loader />}
        {!reportLoader &&
          reportList &&
          reportList.length > 0 &&
          reportList.map(report => (
            <div className="report-list" key={report.id}>
              <div className="row">
                <div className="col-md-8">
                  <div className="report-content">
                    <h4>{report.title}</h4>

                    <div className="summary-content">
                      <p>
                        <b>Report Type</b>
                        <span>{GetType(report.type)}</span>
                      </p>
                      <p>
                        <b>no. of datapoints</b>
                        <span>{report.datapoints}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="report-share-time">
                    <div className="report-item created-time">
                      <h6>Date Created</h6>
                      <p>
                        {format(report.created_at, ['MMMM Do YYYY'])}
                      </p>
                      <time>
                        {format(report.created_at, ['h:mm a'])}
                      </time>
                    </div>
                    {report.shared_with &&
                      report.shared_with.length > 0 &&
                      report.shared_with.map(() => (
                        <div className="report-item share-report">
                          <h6>Shared with</h6>
                          <ul className="shared-list">
                            <li>Santosh khanal</li>
                            <li>Jasica standford</li>
                            <li>Khusbu basnet</li>
                          </ul>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="dropdown report-option">
                <Dropdown drop="left">
                  <Dropdown.Toggle
                    variant=""
                    id="dropdown-Data"
                    className="dropdown-toggle common-button no-border is-icon"
                  >
                    <i className="material-icons">more_vert</i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                    {DataCrude.map(item => (
                      <div key={item.id}>
                        <Dropdown.Item key={item.id}>
                          {item.title}
                        </Dropdown.Item>
                      </div>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          ))}
        {!reportLoader && reportList && reportList.length === 0 && (
          <div>No Report Found Yet.</div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyReports);
