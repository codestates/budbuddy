import React, { forwardRef, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faEyeDropperEmpty, faSpa } from "@fortawesome/free-solid-svg-icons";

const Layout = styled.div`
  /* border: solid 2px blue; */
  .manage-box {
    display: flex;
    /* border: solid 1px red; */
  }

  .manage-box > .icon {
    display: flex;
    justify-content: center;
    width: 11.5%;
    /* border: solid 1px green; */
    padding: 3px 0;
    align-items: center;
  }

  .text {
    /* width: 12%; */
    text-align: center;
    font-size: ${(props) => props.theme.fontWritePageMid};
    padding: 6px 0 0 0;
  }
  .icon {
    align-self: center;
    font-size: 1.4rem;
    color: SlateGrey;
    padding: 3px;
  }

  .water,
  .fertilize,
  .repot {
    transition: color 0.25s ease;
  }

  .water.fill {
    color: DodgerBlue;
  }

  .fertilize.fill {
    color: MediumSeaGreen;
  }

  .repot.fill {
    color: Sienna;
  }
  .semantic {
    display: none;
  }
`;

const AwesomeIcon = forwardRef(({ className, icon, onClick }, ref) => <FontAwesomeIcon icon={icon} className={className} onClick={onClick} forwardedRef={ref} />);

function PlantManageToggle({ className, actions = {}, mode = "" }) {
  const waterRef = useRef(null);
  const fertilizeRef = useRef(null);
  const repotRef = useRef(null);

  const [isReadOnly, setReadOnly] = useState(false);
  const [toggle, setToggle] = useState({
    isWater: true,
    isFertilize: true,
    isRepot: true,
  });

  useEffect(() => {
    if (mode === "read") {
      if (actions.isWater) toggleHandler("water");
      if (actions.isFertilize) toggleHandler("fertilize");
      if (actions.isRepot) toggleHandler("repot");
      setReadOnly(true);
    }
  }, []);

  function toggleHandler(fnName) {
    const task = {
      water() {
        setToggle({ ...toggle, isWater: !toggle.isWater });
        if (toggle.isWater) {
          waterRef.current.classList.add("fill");
        } else {
          waterRef.current.classList.remove("fill");
        }
      },
      fertilize() {
        setToggle({ ...toggle, isFertilize: !toggle.isFertilize });

        if (toggle.isFertilize) {
          fertilizeRef.current.classList.add("fill");
        } else {
          fertilizeRef.current.classList.remove("fill");
        }
      },
      repot() {
        setToggle({ ...toggle, isRepot: !toggle.isRepot });
        if (toggle.isRepot) {
          repotRef.current.classList.add("fill");
        } else {
          repotRef.current.classList.remove("fill");
        }
      },
    };

    if (!task[fnName]) {
      return null;
    }
    if (isReadOnly) return;
    return task[fnName]();
  }

  return (
    <Layout className={className}>
      <div className="shell">
        <button className="semantic" name="toggle" value={JSON.stringify(toggle)} />
        <div className="manage-box">
          <div className="text">
            <div>관리:</div>
          </div>
          <div className="icon">
            <AwesomeIcon
              className={"water"}
              ref={waterRef}
              icon={faDroplet}
              onClick={() => {
                toggleHandler("water");
              }}
            />
          </div>
          <div className="icon">
            <AwesomeIcon
              className={"fertilize"}
              ref={fertilizeRef}
              icon={faEyeDropperEmpty}
              onClick={() => {
                toggleHandler("fertilize");
              }}
            />
          </div>
          <div className="icon">
            <AwesomeIcon
              className={"repot"}
              ref={repotRef}
              icon={faSpa}
              onClick={() => {
                toggleHandler("repot");
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PlantManageToggle;
