import React, { useReducer } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import { userReducer, initialState } from "../../store/reducers";
import "./newForm.css";

const NewPortfolio = () => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    let history = useHistory();
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        // createPortfolio();
        dispatch({ type: "create_portfolio", payload: data.portfolio_name });
        history.push("/portfolio", { data, id: 7, color: "green" });
    };

    const { register, handleSubmit } = useForm({
        defaultValues: {
            firstName: "bill",
            lastName: "luo",
            email: "test@test.com",
            isDeveloper: true,
        },
    });

    // const createPortfolio = () => {
    //     axios
    //         .post("/portfolio", {
    //             name: "testportfolioname",
    //             headers: {
    //                 Authorization: `Bearer ${this.state.access_token}`,
    //             },
    //         })
    //         .then((res) => {
    //             console.log(res);
    //         });
    // };

    return (
        <div>
            <Background>
                <Container2>
                    <WatchListContainer>
                        <div className="watchlist">포트폴리오 추가</div>
                    </WatchListContainer>
                    <Form>
                        <form
                            className="new_portfolio_form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <label htmlFor="portfolio_name">
                                포트폴리오 이름
                            </label>
                            <input
                                className="new_portfolio_input"
                                name="portfolio_name"
                                placeholder="첫번째포트폴리오"
                                ref={register}
                            />

                            <label htmlFor="second_qeustion">두번쨰 질문</label>
                            <input
                                className="new_portfolio_input"
                                name="second_qeustion"
                                placeholder="두번쨰질문"
                                ref={register}
                            />

                            <label htmlFor="third_question">Email</label>
                            <input
                                className="new_portfolio_input"
                                name="third_question"
                                placeholder="test@naver.com"
                                type="email"
                                ref={register}
                            />

                            <label>체크</label>
                            <input
                                className="new_portfolio_input"
                                name="check_"
                                type="checkbox"
                                ref={register}
                            />
                            {/* <Link to="/portfolio"> */}
                            <input
                                className="new_portfolio_input"
                                type="submit"
                            />
                            {/* </Link> */}
                        </form>
                    </Form>
                </Container2>
            </Background>
        </div>
    );
};

const Background = styled.div`
    width: 100%;
    height: 200vh;
    background-color: #eff0f3;
`;

const Container2 = styled.div`
    width: 480px;
    margin: auto;
`;

const Form = styled.div`
    width: 100%;
    height: 550px;
    background-color: #13113c;
    padding: 20px;

    border-radius: 15px;
`;

const WatchListContainer = styled.div`
    margin: auto;
    padding-top: 20px;
    .watchlist {
        padding: 40px 0 0;
        line-height: 1.4;
        font-size: 2rem;
        font-weight: 900;
        color: #13113c;
        margin-right: 10px;
        margin-bottom: 15px;
        font-family: merriweather, sans-serif, Helvetica, Arial;
    }
`;
export default NewPortfolio;
