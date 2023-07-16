import BarGraph from "../BarGraph/BarGraph";

import "./graph-modal.css";

const GraphsModal = ({
  apiData,
  graphHeading,
  handleClose,
  xAxisDataKey,
  yAxisDataKey,
  modalBarColor,
}) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="close-button-container">
          <button onClick={handleClose}>X</button>
        </div>
        <div className="modal-body">
          <h2 className="graph-heading">{graphHeading}</h2>
          <div className="graph-wrapper">
            <BarGraph
              apiData={apiData}
              xAxisDataKey={xAxisDataKey}
              yAxisDataKey={yAxisDataKey}
              barColor={modalBarColor}
              width={800}
              height={250}
              strokeDasharray={"2 2"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphsModal;
