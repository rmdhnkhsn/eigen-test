import React from "react";
import axios from "axios";
import './index.css';

class App extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    errors: null
  };

  getArticles() {
    axios
      .get("https://newsapi.org/v2/everything?q=ai&apiKey=5f1cb51705b04ebfb27f12dd322cafcc")
      .then(response => {
        return response.data.articles.map(article => ({
          date: `${article.publishedAt}`,
          title: `${article.title}`,
          url: `${article.url}`,
          description: `${article.description}`
        }));
      })
      .then(articles => {
        this.setState({
          articles,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getArticles();
  }

  render() {
    const { isLoading, articles } = this.state;
    console.log(articles);
    return (
      <React.Fragment>
        <div className="container">
          {!isLoading ? (
            articles.map(article => {
              const { date, title, url, description } = article;
              return (
                <div className="content">
                  <div className="cards">
                    <p>{date}</p>
                    <p>{title}</p>
                    <p>{url}</p>
                    <p>{description}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default App;