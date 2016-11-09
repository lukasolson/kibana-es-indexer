import {isArray, compact} from 'lodash';
import 'ace';
import chrome from 'ui/chrome';
import uiModules from 'ui/modules';
import uiRoutes from 'ui/routes';
import 'ui/autoload/styles';
import 'ui/directives/file_upload';
import template from './index.html';
import './index.less';

uiRoutes.enable();
uiRoutes.when('/', {
  template,
  controller: ($scope, $http) => {
    $scope.transformFunction = 'return fileContents.split("\\n").map(function (line) {\n\treturn {message: line};\n});';
    $scope.index = {
      index: '',
      type: '',
      docs: []
    };

    $scope.upload = fileContents => {
      $scope.fileContents = fileContents;
    };

    $scope.transformFileContents = (fileContents, transformFunction) => {
      const fn = new Function('fileContents', transformFunction);
      $scope.index.docs = compact(fn(fileContents));
      if (!isArray($scope.index.docs)) $scope.index.docs = [$scope.index.docs];
    };

    $scope.index = (index, type, docs) => {
      $http.post('../api/indexer/v1/index', {
        index, type, docs
      }).then(response => console.log(response), error => console.log(error));
    };
  }
});
