import Vue from "vue";
import Vuex, { MutationTree, ActionTree } from "vuex";

import { APIConfig } from "./utils/api.utils";
import axios, { AxiosResponse } from "axios";

import { iUser } from "@/models/user.interface";
import { iAnnouncement } from './models/announcement.interface';
import { iService } from "@/models/service.interface";
import { iCart} from "@/models/cart.interface";

Vue.use(Vuex);

interface iRootState {
  userToken: string | null;
  user: iUser | null;
  cart: iCart | null;
  orderNum: number | null;
}

interface iLoginPayload {
  token: string;
  userid: number;
}

const state: iRootState = {
  userToken: null,
  user: null,
  cart: null,
  orderNum: null,
};

const mutations: MutationTree<iRootState> = {
  setUser(state, payload) {
    state.user = payload.user;
  },
  login(state, payload) {
    const { token, user } = payload;
    state.userToken = token;
    state.user = user;
  },
  logout(state) {
    state.userToken = null;
    state.user = null;
  },
  addCart(state, payload) {
    state.cart = payload;
  }
};

const actions: ActionTree<iRootState, iRootState> = {
  fetchUser({ commit }, payload) {
    const { userid } = payload;
    return axios
      .get(APIConfig.buildUrl(`/users/${userid}`))
      .then((res: AxiosResponse<{ user: iUser }>) => {
        commit("setUser", { user: res.data.user });
        return res.data.user;
      });
  },
  login({ commit, dispatch }, payload) {
    const { userid, token } = payload;
    dispatch("fetchUser", { userid }).then(user => {
      commit("login", { user, token });
    });
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
