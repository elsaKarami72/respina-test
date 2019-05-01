import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    contact: [
      {
        id: 0,
        index: 0,
        url: "Git",
        subject:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        time: "4:30 AM",
        category: "private",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
      },
      {
        id: 1,
        index: 1,
        url: "Gitlab",
        subject:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        time: "4:30 AM",
        category: "private",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
      },
      {
        index: 10,
        id: 10,
        url: "Coursera",
        subject: "How to get started with Coursera.",
        time: "17:30 PM",
        category: "work",
        content:
          "On Coursera, more than 35 million people are achieving their goals with online courses and degrees from the world’s best universities.Every learning program on Coursera is flexible and 100% online. Make progress at your own pace with video lectures, readings, quizzes, and more.Getting started is easy.Choose a course or Specialization that covers a subject that interests you. A Specialization is a series of courses that helps you master a skill — you can try many of them for free with a 7-day trial."
      },
      {
        id: 2,
        index: 2,
        url: "GoogleScholar Alert",
        subject:
          "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        time: "8:30 AM",
        category: "work",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
      },
      {
        id: 3,
        index: 3,
        url: "MediumDaily Digest",
        subject: "hello",
        time: "12:30 PM",
        category: "star",
        content:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
      },
      {
        id: 4,
        index: 4,
        url: "Pinterst",
        subject:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English",
        time: "18:00 PM",
        category: "important",
        content:
          "Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32."
      },
      {
        id: 5,
        index: 5,
        url: "Google ScholarAlert",
        subject:
          "Various versions have evolved over the years, sometimes by accident",
        time: "12:30 PM",
        category: "star",
        content:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,"
      },
      {
        id: 6,
        index: 6,
        url: "Pinterest",
        subject:
          " The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        time: "12:30 PM",
        category: "important",
        content:
          "making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
      },
      {
        id: 7,
        index: 7,
        url: "Medium Daily",
        subject:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        time: "17:10 PM",
        category: "private",
        content:
          "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
      },
      {
        id: 8,
        index: 8,
        url: "MediumDaily",
        subject:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English",
        time: "12:30 PM",
        category: "important",
        content:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
      },
      {
        id: 9,
        index: 9,
        url: "elsa.karami@gmail.com",
        subject:
          "I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth,",
        time: "22:50 PM",
        category: "star",
        content:
          "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
      }
    ],
    userInfo: {
      name: "zahra",
      family: "karami",
      Email: "elsa.karami@gmail.com",
      profileImage: "./assets/pdefault.jpg",
      username: "123",
      password: "123"
    }
  },
  mutations: {},
  actions: {},
  getters: {
    mailContact: state => {
      var mailContact = state.contact.map(contacts => {
        return {
          id: contacts.id,
          index: contacts.index,
          url: contacts.url,
          subject: contacts.subject,
          time: contacts.time,
          content: contacts.content,
          category: contacts.category
        };
      });
      return mailContact;
    }
  }
});
