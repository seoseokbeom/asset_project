import React, { useState, useContext, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
// import { useParams } from "react-router-dom";

// import ButtonBox from "./ButtonBox";
import { GlobalContext } from "../../store/GlobalState";
import pink from "@material-ui/core/colors/pink";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

function AddCategory({ id }) {
    const [addIconVisable, setAddIconVisable] = useState(true);
    // const { portfolioId2 } = useParams();
    const [activeButtonIndex, setActiveButtonIndex] = useState(3);
    const [inputValue, setInputValue] = useState("");
    const onClick = () => setAddIconVisable(!addIconVisable);
    const { userState, userDispatch, stockDispatch } = useContext(
        GlobalContext
    );

    const [buttonBoxList, setButtonBoxList] = useState([]);
    const onChange = (event) => {
        /*  event: 사용자의 액션에 따라서 자동으로 이벤트가
      생성되며, 특정한 파라미터가 없을경우, 기본 파라미터로 이벤트 객체가 생성된다. */
        setInputValue(event.target.value);
    };
    const addCategoryAxios = async (categoryName) => {
        console.log("categoryName:", categoryName);
        // console.log("activePortfolioId:", userState.activePortfolioId);
        console.log("usepram:", id);
        const response = await axios.post(
            `/portfolio/${id}/category`,
            {
                category: categoryName,
            },
            {
                headers: {
                    Authorization: `Bearer ${userState.loginInfo.access_token}`,
                },
            }
        );
        console.log("response.config.data:", response.config.data);
        const JsonParsed = JSON.parse(response.config.data);
        console.log(`response.config.data.category`, JsonParsed.category);
        setButtonBoxList([...buttonBoxList, JsonParsed.category]);
        // console.log(
        //     "response.config.data.json():",
        //     response.config.data.json()
        // );
        // console.log(
        //     "response.config.data.json().category:",
        //     response.config.data.json().category
        // );
    };

    useEffect(() => {
        axios
            .get(`/portfolio/${id}`, {
                headers: {
                    Authorization: `Bearer ${userState.loginInfo.access_token}`,
                },
            })
            .then((res) => {
                console.log(
                    "Object.keys(res.data.goalAssetRatio.stockRatios):",
                    Object.keys(res.data.goalAssetRatio.stockRatios)
                );
                setButtonBoxList(
                    Object.keys(res.data.goalAssetRatio.stockRatios)
                );
                // Object.keys(res.data.goalAssetRatio.stockRatios).map(
                //     (portfolioName) => {
                //         setButtonBoxList([...buttonBoxList, portfolioName]);
                //     }
                // );
            });

        // console.log("Portfolio get:", result2);
    }, []);

    useEffect(() => {
        console.log("buttonBoxList:", buttonBoxList);
    }, [buttonBoxList]);

    const onKeyPress = (event) => {
        // 클릭 했을때 실행할 소스 추가
        if (event.key === "Enter") {
            alert("버튼의 클릭 효과");
            // setInputValue(event.target.value);
            addCategoryAxios(inputValue);
            setAddIconVisable(!addIconVisable);
        }
    };
    const primary = pink[500];

    const useStyles = makeStyles((theme) => ({
        root: {
            "& > *": {
                margin: theme.spacing(1),
            },
        },
    }));

    function ButtonBox({
        key,
        buttonText,
        buttonColor,
        // setActiveButtonIndex,
        activeButtonIndex,
    }) {
        const classes = useStyles();
        return (
            <span className={classes.root}>
                {console.log(key)}
                <Button
                    variant="contained"
                    color={buttonColor}
                    onClick={() => setActiveButtonIndex(key)}
                >
                    {buttonText}
                </Button>
            </span>
        );
    }

    // const buttonBoxList = ["00", "11", "22", "33"];
    // useEffect(() => {}, [activeButtonIndex]);
    const classes = useStyles();
    const list = buttonBoxList.map((v, i) => {
        if (i == activeButtonIndex) {
            return (
                <span key={i} className={classes.root}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setActiveButtonIndex(i)}
                    >
                        {v}
                    </Button>
                </span>
            );
        }
        return (
            <span key={i} className={classes.root}>
                {console.log("activeButtonIndex:", activeButtonIndex)}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setActiveButtonIndex(i)}
                >
                    {v}
                </Button>
            </span>
            // <ButtonBox
            //     key={i}
            //     buttonText={i}
            //     // onClick={() => {
            //     //     setActiveButtonIndex(i);
            //     //     console.log(i);
            //     // }}
            //     buttonColor="primary"
            // />
        );
    });
    return (
        <div>
            {list}
            {/* <ButtonBox buttonText="한국 주식" /> */}
            {addIconVisable ? (
                <AddIcon onClick={onClick} fontSize="large" />
            ) : (
                <input
                    type="text"
                    value={inputValue}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    placeholder="한국 주식"
                />
            )}
        </div>
    );
}

export default AddCategory;
