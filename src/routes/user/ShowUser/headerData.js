const columns=[
  // 0 用户数据
  [{
      title: '用户数据',
      dataIndex: 'user_name',
      key: 'name'
    }, {
      title: '密码',
      dataIndex: 'user_pwd',
      key: 'name1',
    }, {
      title: '身份',
      dataIndex: 'identity_text',
      key: 'name2',
  }],
  // 1
  [{
      title: '身份名称',
      dataIndex: 'identity_text',
      key: 'name'
  }],
  // 2
  [{
      title: 'api权限名称',
      dataIndex: 'api_authority_text',
      key: 'name'
    }, {
      title: 'api权限url',
      dataIndex: 'api_authority_url',
      key: 'name1',
    }, {
      title: 'api权限方法',
      dataIndex: 'api_authority_method',
      key: 'name2',
  }],
  // 3
  [{
      title: '身份名称',
      dataIndex: 'identity_text',
      key: 'name'
    }, {
      title: 'api权限名称',
      dataIndex: 'api_authority_text',
      key: 'name1',
    }, {
      title: 'api权限url',
      dataIndex: 'api_authority_url',
      key: 'name2',
  },{
      title: 'api权限方法',
      dataIndex: 'api_authority_method',
      key: 'name3',
  }],
  // 4
  [{
      title: '视图权限名称',
      dataIndex: 'view_authority_text',
      key: 'name'
    }, {
      title: '视图id',
      dataIndex: 'view_id',
      key: 'name1',
    }],
  // 5  
  [{
      title: '身份',
      dataIndex: 'identity_text',
      key: 'name'
    },{
      title: '视图权限名称',
      dataIndex: 'view_authority_text',
      key: 'name1'
    }, {
      title: '视图id',
      dataIndex: 'view_id',
      key: 'name2',
  }]
];
  
export default columns