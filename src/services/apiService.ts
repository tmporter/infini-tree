import OrnamentData from "../components/Ornament/OrnamentData";

const base = process.env.REACT_APP_API_BASE;

type GetOrnamentsResponse = {
  ornaments: OrnamentData[];
};

export const getOrnaments = async (): Promise<GetOrnamentsResponse> => {
  const response = await makeGet("/ornaments");
  const data = await response.json();
  return data;
};

export const addOrnament = async (ornament: OrnamentData) => {
  const response = await makePost("/ornaments", ornament);
  const { newOrnament } = await response.json();
  return newOrnament;
};

export const updateOrnament = async (ornament: OrnamentData) => {
  const response = await makePut("/ornaments", ornament.id, ornament);
};

export const deleteOrnament = async (id: string) => {
  const response = await makeDelete("/ornaments", id);
};

const makeGet = (path: string) => {
  return makeRequest(`${base}${path}`, {
    method: "GET",
  });
};

const makePost = <T>(path: string, payload?: T) =>
  makeRequest(`${base}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });

const makePut = <T>(path: string, id: string, payload?: T) =>
  makeRequest(`${base}${path}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });

const makeDelete = (path: string, id: string) =>
  makeRequest(`${base}${path}/${id}`, {
    method: "DELETE",
  });

const makeRequest = (path: string, options?: RequestInit) =>
  fetch(path, {
    ...options,
    headers: {
      ...options?.headers,
      "user-id": localStorage.getItem("USER_ID") || "no-id",
    },
  });
