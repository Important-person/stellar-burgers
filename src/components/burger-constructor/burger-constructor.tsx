import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  burgerSelector,
  removeIngredients
} from '../../services/slices/constructor-slice';
import {
  isLoadingSelector,
  orderSelector,
  fetchOrder,
  removeBurger
} from '../../services/slices/order-slice';
import {
  getIsAuthCheckedSelector,
  getUserSelector
} from '../../services/slices/user-slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(burgerSelector);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthCheckedSelector);
  const user = useSelector(getUserSelector);
  const navigate = useNavigate();

  const orderRequest = useSelector(isLoadingSelector);

  const orderModalData = useSelector(orderSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user && !isAuthenticated) {
      return navigate('/login');
    }

    const ingredients = constructorItems.ingredients.map((item) => item._id);
    dispatch(
      fetchOrder([
        constructorItems.bun._id,
        ...ingredients,
        constructorItems.bun._id
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(removeIngredients());
    dispatch(removeBurger());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
