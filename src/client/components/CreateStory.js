import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import Spinner from './Spinner';

export default class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormComplete: false,
      title: '',
      content: '',
      link: '',
      category: 'default',
      categoryId: '',
      thumbnail: ''
    };
    this.handleCancleClick = this.handleCancleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { onHistoryPush, isUserLoggedIn, history } = this.props;

    if (!isUserLoggedIn) {
      onHistoryPush();
      history.push('/');
    }
  }

  checkFormCompletion() {
    const { title, content, link, category } = this.state;

    if (
      title.trim() &&
      content.trim() &&
      link.trim() &&
      category !== 'default'
    ) {
      this.setState({
        isFormComplete: true
      });
    } else {
      this.setState({
        isFormComplete: false
      });
    }
  }

  handleCancleClick(ev) {
    const { history } = this.props;

    history.goBack();
  }

  handleInputChange(ev) {
    const target = ev.target;
    const name = target.name;
    const value = target.value;

    if (name === 'category') {
      const categoryId = ev.target.selectedOptions[0].dataset.id;

      this.setState({
        categoryId
      });
    }

    this.setState(
      {
        [name]: value
      },
      this.checkFormCompletion
    );
  }

  handleSubmit(ev) {
    ev.preventDefault();

    const { title, content, link, categoryId, thumbnail } = this.state;
    const { onSubmit } = this.props;

    onSubmit(title, content, link, categoryId, thumbnail);
  }

  renderCategories(categories) {
    return categories.map(category => {
      return (
        <option
          key={category._id}
          value={category.title}
          data-id={category._id}
        >
          {category.title}
        </option>
      );
    });
  }

  render() {
    const {
      content,
      category,
      isFormComplete,
      link,
      title,
      thumbnail
    } = this.state;
    const { isLoading, categories } = this.props;

    return (
      <div className="CreateStory">
        <form className="CreateStory__form" onSubmit={this.handleSubmit}>
          <div className="CreateStory__form__item title">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={this.handleInputChange}
              required
              autoFocus
            />
          </div>
          <div className="CreateStory__form__item content">
            <textarea
              type="text"
              name="content"
              placeholder="Content"
              value={content}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="CreateStory__form__item link">
            <input
              type="text"
              name="link"
              placeholder="Youtube Video id - ex)pan9j31Z0mo"
              value={link}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="CreateStory__form__item categories">
            <select
              type="select"
              name="category"
              value={category}
              onChange={this.handleInputChange}
              required
            >
              <option value="default" disabled hidden>
                Select Categories
              </option>
              {categories.length ? this.renderCategories(categories) : null}
            </select>
          </div>
          <div className="CreateStory__form__item thumbnail">
            <input
              type="url"
              name="thumbnail"
              placeholder="Thumbnail Url (option)"
              value={thumbnail}
              onChange={this.handleInputChange}
            />
          </div>
          <button
            type="submit"
            className={
              isFormComplete
                ? 'CreateStory__form__submit-btn active'
                : 'CreateStory__form__submit-btn'
            }
            disabled={!isFormComplete}
          >
            submit
          </button>
          <button
            type="button"
            className="CreateStory__form__cancle-btn"
            onClick={this.handleCancleClick}
          >
            cancle
          </button>
        </form>
        <div className="CreateStory__markdown">
          <ReactMarkdown source={content} className="markdown" />
        </div>
        {isLoading && <Spinner />}
      </div>
    );
  }
}
